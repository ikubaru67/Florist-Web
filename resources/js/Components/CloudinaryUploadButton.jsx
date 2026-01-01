export default function CloudinaryUploadButton({ blob, onSuccess, onError, processing, setProcessing }) {
    const uploadToCloudinary = async () => {
        setProcessing(true);
        
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', 'ml_default'); // Ganti dengan preset Cloudinary Anda
        formData.append('cloud_name', 'YOUR_CLOUD_NAME'); // Ganti dengan cloud name Anda
        
        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', // Ganti YOUR_CLOUD_NAME
                {
                    method: 'POST',
                    body: formData,
                }
            );
            
            const data = await response.json();
            
            if (data.secure_url) {
                onSuccess(data.secure_url);
            } else {
                throw new Error('Upload gagal');
            }
        } catch (error) {
            console.error('Upload error:', error);
            onError(error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <button
            type="button"
            onClick={uploadToCloudinary}
            disabled={processing}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {processing ? 'Mengupload...' : 'Upload & Simpan'}
        </button>
    );
}
