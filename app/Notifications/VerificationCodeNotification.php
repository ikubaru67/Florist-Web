<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerificationCodeNotification extends Notification
{
    use Queueable;

    public $code;

    /**
     * Create a new notification instance.
     */
    public function __construct($code)
    {
        $this->code = $code;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('🌸 Kode Verifikasi - Florist Shop')
                    ->greeting('Halo ' . $notifiable->name . '! 👋')
                    ->line('Terima kasih telah bergabung dengan **Florist Shop**.')
                    ->line('Untuk melanjutkan, silakan masukkan kode verifikasi berikut:')
                    ->line('## ' . $this->code)
                    ->line('⏰ Kode ini berlaku selama **10 menit**.')
                    ->line('Jika Anda tidak merasa mendaftar atau meminta kode ini, abaikan email ini.')
                    ->line('---')
                    ->line('🌺 Butuh bantuan? Hubungi kami di support@floristshop.com')
                    ->salutation('Salam hangat,  
Tim Florist Shop 🌹');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}