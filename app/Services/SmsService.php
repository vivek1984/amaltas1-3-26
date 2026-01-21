<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SmsService
{
    public function send($mobile, $message)
    {
        if (!config('services.msg91.enabled')) {
            return false;
        }

        $url = "https://api.msg91.com/api/v5/flow/";

        $response = Http::withHeaders([
            "authkey" => config('services.msg91.authkey'),
            "Content-Type" => "application/json"
        ])->post($url, [
            "template_id" => config('services.msg91.template_id'),
            "mobiles"     => $mobile,
            "var1"        => $message,
        ]);

        return $response->json();
    }
}
