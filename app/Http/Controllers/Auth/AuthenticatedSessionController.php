<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Ccart;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        $redirect_to = $request->redirect_to;

        $request->authenticate();

        $request->session()->regenerate();

        if($redirect_to === '/checkout') return  $this->returnToCheckoutPage($request->ip());
        else
            return redirect()->intended(route('dashboard', absolute: false));
    }

    private function returnToCheckoutPage($ip) {

        $currentCart = Ccart::where('user_ip', $ip)->get();
        foreach($currentCart as $cart) {
            $cart->user_id = Auth::id();
            $cart->save();
        }

        return redirect('/checkout');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
