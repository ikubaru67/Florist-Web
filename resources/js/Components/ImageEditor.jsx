import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

export default function ImageEditor({ 
    imageUrl, 
    onSave, 
    onClose, 
    targetWidth = 800, 
    targetHeight = null,
    aspectRatio = null 
}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [processing, setProcessing] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        // Set target size based on props or default to 800px
        let finalWidth = pixelCrop.width;
        let finalHeight = pixelCrop.height;
        
        if (targetWidth && targetHeight) {
            // Fixed size (e.g., 1920x600 for banners)
            finalWidth = targetWidth;
            finalHeight = targetHeight;
        } else if (targetWidth) {
            // Max width with aspect ratio maintained
            if (finalWidth > targetWidth || finalHeight > targetWidth) {
                const ratio = Math.min(targetWidth / finalWidth, targetWidth / finalHeight);
                finalWidth = Math.round(finalWidth * ratio);
                finalHeight = Math.round(finalHeight * ratio);
            }
        }

        canvas.width = finalWidth;
        canvas.height = finalHeight;

        ctx.putImageData(
            data,
            0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
            0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg', 0.8); // Compress to 80% quality
        });
    };

    const handleSave = async () => {
        try {
            setProcessing(true);
            const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
            
            // Convert to smaller data URL (max 100KB for quick preview)
            const reader = new FileReader();
            reader.readAsDataURL(croppedBlob);
            reader.onloadend = () => {
                const dataUrl = reader.result;
                
                // Check size
                const sizeInKB = Math.round((dataUrl.length * 3) / 4 / 1024);
                
                if (sizeInKB > 500) {
                    alert(`⚠️ Gambar terlalu besar (${sizeInKB}KB).\n\nSilakan:\n1. Upload gambar hasil crop ke Cloudinary manual\n2. Atau gunakan gambar dengan resolusi lebih kecil`);
                    setProcessing(false);
                    return;
                }
                
                onSave(dataUrl, croppedBlob);
                setProcessing(false);
            };
        } catch (e) {
            console.error('Error cropping image:', e);
            alert('Gagal memproses gambar');
            setProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Edit Gambar</h3>
                        {targetWidth && targetHeight && (
                            <p className="text-sm text-gray-500 mt-1">
                                Target ukuran: {targetWidth}x{targetHeight}px
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Crop Area */}
                <div className="relative h-96 bg-gray-100">
                    <Cropper
                        image={imageUrl}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={aspectRatio || 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                    />
                </div>

                {/* Controls */}
                <div className="px-6 py-4 border-t border-gray-200 space-y-4">
                    {/* Zoom */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            🔍 Zoom
                            <span className="text-gray-500 font-normal">({zoom.toFixed(1)}x)</span>
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* Rotation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            🔄 Rotate
                            <span className="text-gray-500 font-normal">({rotation}°)</span>
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={360}
                            step={1}
                            value={rotation}
                            onChange={(e) => setRotation(parseInt(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => setRotation((r) => (r - 90) % 360)}
                                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                ↺ -90°
                            </button>
                            <button
                                type="button"
                                onClick={() => setRotation((r) => (r + 90) % 360)}
                                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                ↻ +90°
                            </button>
                            <button
                                type="button"
                                onClick={() => setRotation(0)}
                                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-xs text-yellow-800">
                            💡 <strong>Tips:</strong> Hasil crop akan di-resize max 800px dan compress untuk menghindari file terlalu besar.
                            Jika masih terlalu besar, upload manual ke Cloudinary lalu paste URL-nya.
                        </p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            disabled={processing}
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={processing}
                            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Memproses...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
