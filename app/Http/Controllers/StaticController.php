<?php

namespace App\Http\Controllers;

use App\Helpers\ReactEmail;
use App\Models\Cluster;
use App\Models\Inquiry;
use App\Services\EmailService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StaticController extends Controller
{
    public function aboutUs() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/AboutUs', ['clusters' => $clusters]);

    }

    public function locateUs() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/LocateUs', ['clusters' => $clusters]);
    }

    public function contactUs() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/ContactUs', ['clusters' => $clusters]);
    }

    public function contactSubmit(Request $request)
{
    // 1) Validate input
    $data = $request->validate([
        'name'    => 'required|string|max:255',
        'mobile'  => 'required|string|max:15',
        'email'   => 'nullable|email|max:255',
        'message' => 'required|string|max:3000',
        'recaptcha_token' => 'required',
    ]);

    // 2) Validate Google reCAPTCHA v3
    if (! $this->validateCaptcha($request->recaptcha_token)) {
        return back()->withErrors(['captcha' => 'Captcha verification failed. Please try again.']);
    }

    // 3) Prepare additional structured fields
    $data['type'] = 'Inquiry';
    $data['phone'] = $data['mobile'];
    unset($data['mobile']);

    // 4) Store inquiry in the database
    $inquiry = Inquiry::create($data);

    // 5) Send email
    $this->sendEmail($data);

    // 6) Send success response
    return back()->with("success", "Your message has been sent. Our team will contact you shortly.");
}


    private function sendEmail($data) {
         $emailService = new EmailService();
         //  Send email to admin
    try {
        $htmlToAdmin = ReactEmail::render("ContactAdmin", [
            "data" => $data
        ]);

        $emailService->send("amaltasfurniture@gmail.com", "New Inquiry Received", $htmlToAdmin);

    } catch (\Exception $e) {
        \Log::error("Admin contact email failed: " . $e->getMessage());
    }

    // 5) Send auto-reply to customer
    try {
        $htmlToCustomer = ReactEmail::render("ContactCustomer", [
            "name" => $data["name"]
        ]);

        $emailService->send($data["email"], "Thanks for contacting Amaltas", $htmlToCustomer);

    } catch (\Exception $e) {
        \Log::error("Customer auto-reply failed: " . $e->getMessage());
    }
    }


    public function customFurniture() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/CustomFurniture', ['clusters' => $clusters]);
    }

    public function storeCustomFurniture(Request $request) {

        // 1. Validate basic fields first
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:50',
        'email' => 'nullable|email|max:255',
        'address' => 'required|string',
        'furnitureType' => 'nullable|string|max:255',
        'dimensions' => 'nullable|string|max:255',
        'material' => 'nullable|string|max:255',
        'budget' => 'nullable|string|max:255',
        'description' => 'nullable|string',
        'file' => 'nullable|mimes:jpg,jpeg,png,pdf|max:10240', // 10MB
        'recaptcha_token' => 'required'
    ]);

    // 2. Validate Google reCAPTCHA v3
    if (! $this->validateCaptcha($request->recaptcha_token)) {
        return back()->withErrors([
            'captcha' => 'Captcha verification failed. Please try again.'
        ]);
    }

    // 3. Handle file upload
    $filePath = null;

    if ($request->hasFile('file')) {
        $filePath = $request->file('file')->store('custom-furniture', 'public');
    }

    // 4. Save to database (use your model here)
    $entry = Inquiry::create([
        'name' => $request->name,
        'type' => 'Custom Furniture',
        'phone' => $request->phone,
        'email' => $request->email,
        'address' => $request->address,
        'furniture_type' => $request->furnitureType,
        'dimensions' => $request->dimensions,
        'material' => $request->material,
        'budget' => $request->budget,
        'message' => $request->description,
        'file_path' => $filePath,
    ]);

    $this->sendEmail($validated);
    // 5. Return back with success message
    return back()->with('success', 'Your request has been submitted successfully!');

    }

    private function validateCaptcha($token){
    $secret = env('NOCAPTCHA_SECRET');

    $response = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$token}"
    );

    $result = json_decode($response, true);

    return ($result['success'] ?? false) === true && ($result['score'] ?? 0) > 0.5;
    }

    public function exports() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/Exports', ['clusters' => $clusters]);

    }

     public function shippingPolicy() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/ShippingPolicy', ['clusters' => $clusters]);

    }

    public function returnPolicy() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/ReturnPolicy', ['clusters' => $clusters]);

    }

    public function termsOfUse() {
        $clusters = Cluster::with(['groups'])->get();
        return Inertia::render('Footer/TermsOfUse', ['clusters' => $clusters]);

    }


}
