import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageEditorProps {
  imageUrl: string;
  onSave: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export function ImageEditor({ imageUrl, onSave, onCancel }: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
      onSave(croppedImage);
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  const resetTransform = () => {
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Edit Banner Image</h2>
            <p className="text-gray-500 text-sm">Crop, resize, and adjust your banner image</p>
          </div>
          <button
            onClick={onCancel}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative flex-1 bg-gray-900 min-h-[400px]">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={16 / 9}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>

        {/* Controls */}
        <div className="p-6 border-t border-gray-200 space-y-4">
          {/* Zoom Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700 text-sm flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                Zoom
              </label>
              <span className="text-gray-500 text-sm">{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Rotation Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-700 text-sm flex items-center gap-2">
                <RotateCw className="w-4 h-4" />
                Rotation
              </label>
              <span className="text-gray-500 text-sm">{rotation}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={resetTransform}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              <Check className="w-4 h-4" />
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to create cropped image
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

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

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return canvas.toDataURL('image/jpeg');
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}
