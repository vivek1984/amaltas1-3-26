<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Services\EmailService;
use App\Helpers\ReactEmail;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        // Use Laravel's mail channel, but override the email sending
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = url('/reset-password/' . $this->token . '?email=' . urlencode($notifiable->email));

        // Generate HTML using your React Email system
        $html = ReactEmail::render("PasswordReset", [
            "name" => $notifiable->name,
            "url" => $url,
        ]);

        // Send via Resend
        $mailer = new EmailService();
        $mailer->send($notifiable->email, "Reset Your Password", $html);

        // Return a dummy Laravel MailMessage (Laravel requires this but won't send it)
        return (new MailMessage)
            ->subject("Reset Your Password")
            ->line("A password reset email has been sent to your email.");
    }
}
