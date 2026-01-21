<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Pincode; // Import the Pincode model
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Session; // Import Session facade
use Illuminate\Support\Facades\Log; // Import Log facade for debugging

use App\Services\EmailService;
use App\Helpers\ReactEmail;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $request = request(); // Get the current request instance

        // If the 'redirect_to' query parameter is present when the form is loaded,
        // store it in the session. This ensures it persists across the form submission.
        if ($request->has('redirect_to')) {
            Session::put('redirect_after_register', $request->query('redirect_to'));
            Log::debug("RegisteredUserController@create: 'redirect_to' found in query: {$request->query('redirect_to')}. Stored in session.");
        } else {
            Log::debug("RegisteredUserController@create: 'redirect_to' not found in query.");
        }

        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'mobile' => 'required|string|lowercase|max:10|unique:'.User::class,
            'email' => 'nullable|email|max:255|unique:'.User::class,
            'pincode' => 'required|string|max:6', // Pincode is required for user registration
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $userEmail = $request->email ?? null;

        // Create the new user
        $user = User::create([
            'name' => $request->name,
            'mobile' => $request->mobile,
            'email' => $userEmail,
            'pincode' => $request->pincode, // Store pincode in user table
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        $this->sendEmail($request->name, $userEmail, $request->password);

        Auth::login($user);

        // --- Logic to create address entry based on pincode ---
        try {
            // Find the pincode details from the pincodes table
            $pincodeData = Pincode::where('pincode', $request->pincode)->first();

            if ($pincodeData) {
                // Create an address entry for the new user
                // Mapping:
                // address_line1 from 'office_type'
                // city from 'district'
                // state from 'state_name'
                $user->addresses()->create([
                    'address_line1' => $pincodeData->office_name ?? 'N/A', // Use office_type for address_line1
                    'address_line2' => $pincodeData->division_name ?? null, // Optionally use office_name for line2
                    'city' => $pincodeData->district ?? 'N/A', // Use district for city
                    'state' => $pincodeData->state_name ?? 'N/A', // Use state_name for state
                    // Pincode is NOT added here as per your instruction for the addresses table
                ]);
                Log::info("Address created for new user {$user->id} using pincode data.");
            } else {
                Log::warning("Pincode '{$request->pincode}' not found in pincodes table for user {$user->id}. Address not created automatically.");
            }
        } catch (\Exception $e) {
            Log::error("Error creating address for user {$user->id}: " . $e->getMessage(), ['exception' => $e]);
            // You might want to add a flash message here to inform the user that address creation failed
        }
        // --- End of address creation logic ---

        // Retrieve the intended redirect URL from the session, then remove it.
        $intendedUrl = Session::pull('redirect_after_register');

        Log::debug("RegisteredUserController@store: After registration, intendedUrl from session: " . ($intendedUrl ?? 'NULL'));

        // If an intended URL was found in the session, redirect there.
        // Otherwise, fall back to the default dashboard route.
        if ($intendedUrl) {
            Log::debug("RegisteredUserController@store: Redirecting to intended URL: {$intendedUrl}");
            return redirect()->intended($intendedUrl);
        } elseif ($user->id === 1) { // Example: Admin redirect
            Log::debug("RegisteredUserController@store: User is admin (ID 1), redirecting to admin-dashboard.");
            return redirect()->route('admin-dashboard');
        } else {
            Log::debug("RegisteredUserController@store: No intended URL, not admin. Redirecting to dashboard.");
            return redirect(route('dashboard', absolute: false));
        }
    }

    private function sendEmail($name, $email, $password) {

        $html = ReactEmail::render("WelcomeEmail", [
        "name" => $name,
        "email" => $email,
        "password" => $password
    ]);

    $mailer = new EmailService();
    $response = $mailer->send($email, "Welcome to Amaltas", $html);

    }
}
