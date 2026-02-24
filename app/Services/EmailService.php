<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class EmailService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('RESEND_API_KEY');
    }

    public function send($to, $subject, $html)
    {
        return Http::withToken($this->apiKey)
            ->post('https://api.resend.com/emails', [
                'from' => "Amaltas <orders@amaltasfurniture.com>",
                'to' => $to,
                'subject' => $subject,
                'html' => $html,
            ])
            ->json();
    }
}
