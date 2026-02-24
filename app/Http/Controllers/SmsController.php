<?php

namespace App\Http\Controllers;

use App\Services\SmsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SmsController extends Controller
{
    public function sendOtp(Request $request, SmsService $sms)
    {
        $request->validate([
            'mobile' => 'required|digits:10'
        ]);

        $otp = rand(100000, 999999);

        // Store OTP temporarily (5 minutes)
        Cache::put('otp_'.$request->mobile, $otp, now()->addMinutes(5));

        $sms->send($request->mobile, "Your OTP is $otp");

        return response()->json(['message' => 'OTP sent']);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'mobile' => 'required|digits:10',
            'otp' => 'required|digits:6'
        ]);

        $cachedOtp = Cache::get('otp_'.$request->mobile);

        if (!$cachedOtp) {
            return response()->json(['error' => 'OTP expired'], 400);
        }

        if ($cachedOtp != $request->otp) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        Cache::forget('otp_'.$request->mobile);

        return response()->json(['message' => 'OTP verified successfully']);
    }
}
