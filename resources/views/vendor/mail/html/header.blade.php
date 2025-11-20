@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="https://laravel.com/img/notification-logo.png" class="logo" alt="Laravel Logo">
@else
{{-- Tambahkan logo Anda di sini --}}
<img src="https://i.imgur.com/your-logo.png" class="logo" alt="Florist Shop" style="height: 50px;">
<span style="font-size: 24px; font-weight: bold; color: #e91e63; margin-left: 10px;">
    🌸 {{ config('app.name') }}
</span>
@endif
</a>
</td>
</tr>
