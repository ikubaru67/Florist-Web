import { useEffect, useRef } from 'react';

export default function CloudinaryUploadWidget({ onUploadSuccess, buttonText = "Upload Image", multiple = false }) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        // Load Cloudinary widget script
        if (!window.cloudinary) {
            const script = document.createElement('script');
            script.src = 'https://upload-widget.cloudinary.com/global/all.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                initializeWidget();
            };
        } else {
            initializeWidget();
        }

        return () => {
            // Cleanup widget on unmount
            if (widgetRef.current) {
                widgetRef.current.destroy();
            }
        };
    }, []);

    const initializeWidget = () => {
        cloudinaryRef.current = window.cloudinary;
        
        // Initialize the upload widget
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo',
                uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
                sources: ['local', 'url', 'camera'],
                multiple: multiple,
                maxFiles: multiple ? 5 : 1,
                maxFileSize: 5000000, // 5MB
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'gif', 'webp'],
                resourceType: 'image',
                folder: 'florist-products',
                cropping: true,
                croppingAspectRatio: 1,
                croppingShowDimensions: true,
                showSkipCropButton: false,
                styles: {
                    palette: {
                        window: '#FFFFFF',
                        windowBorder: '#EC4899',
                        tabIcon: '#EC4899',
                        menuIcons: '#5A616A',
                        textDark: '#000000',
                        textLight: '#FFFFFF',
                        link: '#EC4899',
                        action: '#EC4899',
                        inactiveTabIcon: '#9CA3AF',
                        error: '#EF4444',
                        inProgress: '#EC4899',
                        complete: '#10B981',
                        sourceBg: '#F9FAFB'
                    },
                    fonts: {
                        default: null,
                        "'Figtree', sans-serif": {
                            url: null,
                            active: true
                        }
                    }
                }
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    console.log('Upload successful:', result.info);
                    
                    // Return the secure URL to parent component
                    if (onUploadSuccess) {
                        onUploadSuccess({
                            url: result.info.secure_url,
                            publicId: result.info.public_id,
                            width: result.info.width,
                            height: result.info.height,
                            format: result.info.format,
                            bytes: result.info.bytes
                        });
                    }
                }
                
                if (error) {
                    console.error('Upload error:', error);
                    alert('Upload gagal. Silakan coba lagi.');
                }
            }
        );
    };

    const openWidget = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        }
    };

    return (
        <button
            type="button"
            onClick={openWidget}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {buttonText}
        </button>
    );
}
