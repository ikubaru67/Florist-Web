import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', show, onClose, duration = 4000 }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            // Trigger animation
            setTimeout(() => setIsVisible(true), 10);
            
            // Auto dismiss
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [show, duration]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300); // Wait for animation to complete
    };

    if (!show) return null;

    const typeConfig = {
        success: {
            icon: CheckCircle,
            gradient: 'from-emerald-500 to-teal-500',
            bg: 'from-emerald-50 to-teal-50',
            border: 'border-emerald-200',
            text: 'text-emerald-900',
            iconColor: 'text-emerald-600'
        },
        error: {
            icon: XCircle,
            gradient: 'from-red-500 to-rose-500',
            bg: 'from-red-50 to-rose-50',
            border: 'border-red-200',
            text: 'text-red-900',
            iconColor: 'text-red-600'
        },
        warning: {
            icon: AlertCircle,
            gradient: 'from-orange-500 to-amber-500',
            bg: 'from-orange-50 to-amber-50',
            border: 'border-orange-200',
            text: 'text-orange-900',
            iconColor: 'text-orange-600'
        },
        info: {
            icon: Info,
            gradient: 'from-blue-500 to-cyan-500',
            bg: 'from-blue-50 to-cyan-50',
            border: 'border-blue-200',
            text: 'text-blue-900',
            iconColor: 'text-blue-600'
        }
    };

    const config = typeConfig[type] || typeConfig.success;
    const Icon = config.icon;

    return (
        <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
            <div
                className={`
                    pointer-events-auto
                    min-w-[320px] max-w-md
                    bg-gradient-to-br ${config.bg}
                    backdrop-blur-sm
                    border-2 ${config.border}
                    rounded-2xl
                    shadow-2xl shadow-black/10
                    transform transition-all duration-300 ease-out
                    ${isVisible 
                        ? 'translate-x-0 opacity-100 scale-100' 
                        : 'translate-x-full opacity-0 scale-95'
                    }
                `}
            >
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${config.gradient} rounded-t-xl`} />
                
                <div className="p-4 flex items-start gap-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
                        <Icon className="w-6 h-6" />
                    </div>

                    {/* Message */}
                    <div className={`flex-1 ${config.text} font-medium text-sm leading-relaxed`}>
                        {message}
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className={`
                            flex-shrink-0 
                            ${config.iconColor} 
                            hover:opacity-70 
                            transition-opacity
                            p-1 -m-1 rounded-lg
                            hover:bg-black/5
                        `}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
