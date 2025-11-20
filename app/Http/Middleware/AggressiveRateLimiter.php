<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class AggressiveRateLimiter
{
    /**
     * Handle an incoming request.
     * Multi-layer rate limiting to prevent brute force attacks
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $maxAttempts = '5', string $decayMinutes = '1'): Response
    {
        $ip = $request->ip();
        
        // Layer 1: Per-second rate limit (prevent rapid fire attacks)
        $perSecondKey = 'rate_limit_second:' . $ip;
        $perSecondCount = Cache::get($perSecondKey, 0);
        
        if ($perSecondCount >= 3) {
            return $this->buildResponse('Too many requests. Please slow down.', 429);
        }
        
        Cache::put($perSecondKey, $perSecondCount + 1, now()->addSeconds(1));
        
        // Layer 2: Per-minute rate limit (existing throttle)
        $perMinuteKey = 'rate_limit_minute:' . $ip;
        
        if (RateLimiter::tooManyAttempts($perMinuteKey, $maxAttempts)) {
            $seconds = RateLimiter::availableIn($perMinuteKey);
            
            // Layer 3: Progressive penalty (block for longer if repeated abuse)
            $abuseKey = 'rate_limit_abuse:' . $ip;
            $abuseCount = Cache::get($abuseKey, 0);
            
            if ($abuseCount > 3) {
                // Permanent block for 1 hour after 3 violations
                Cache::put('rate_limit_blocked:' . $ip, true, now()->addHour());
                return $this->buildResponse('Your IP has been temporarily blocked due to suspicious activity. Please try again in 1 hour.', 403);
            }
            
            Cache::put($abuseKey, $abuseCount + 1, now()->addMinutes(15));
            
            return $this->buildResponse("Too many attempts. Please try again in {$seconds} seconds.", 429);
        }
        
        // Layer 4: Check if IP is permanently blocked
        if (Cache::get('rate_limit_blocked:' . $ip)) {
            return $this->buildResponse('Your IP has been blocked. Please contact support if this is an error.', 403);
        }
        
        RateLimiter::hit($perMinuteKey, $decayMinutes * 60);
        
        $response = $next($request);
        
        // Add rate limit headers
        $response->headers->set('X-RateLimit-Limit', $maxAttempts);
        $response->headers->set('X-RateLimit-Remaining', max(0, $maxAttempts - RateLimiter::attempts($perMinuteKey)));
        
        return $response;
    }
    
    /**
     * Build rate limit response
     */
    protected function buildResponse(string $message, int $status): Response
    {
        // Check if this is an Inertia request (React/Vue frontend)
        if (request()->header('X-Inertia')) {
            // Return proper Inertia error response
            return response()->json([
                'message' => $message,
            ], $status)
            ->header('X-Inertia', 'true');
        }
        
        // For API requests
        if (request()->expectsJson()) {
            return response()->json([
                'message' => $message,
                'status' => $status,
            ], $status);
        }
        
        // For traditional web requests (if any)
        return redirect()->back()
            ->withErrors(['rate_limit' => $message])
            ->setStatusCode($status);
    }
}
