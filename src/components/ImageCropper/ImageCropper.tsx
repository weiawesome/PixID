import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { Download, RotateCcw, RotateCw } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import { useCropContext } from '../../contexts/CropContext';
import { getCroppedImg, downloadImage } from '../../utils/imageProcessing';

export default function ImageCropper() {
  const { t } = useTranslation();
  const { images, currentImageId } = useImageContext();
  const { crop, zoom, aspect, rotation, setCrop, setZoom, setRotation, setCroppedAreaPixels } = useCropContext();

  const [isExporting, setIsExporting] = useState(false);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const currentImage = images.find(img => img.id === currentImageId);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  }, [setCroppedAreaPixels]);

  const handleExport = async () => {
    if (!currentImage || !croppedArea) return;

    setIsExporting(true);
    try {
      const croppedBlob = await getCroppedImg(
        currentImage.preview,
        croppedArea,
        rotation,
        {
          format: 'image/jpeg',
          quality: 0.95
        }
      );

      downloadImage(croppedBlob, `pixid_${Date.now()}.jpg`);
    } catch (error) {
      console.error('Export failed:', error);
      alert(t('export.error'));
    } finally {
      setIsExporting(false);
    }
  };

  if (!currentImage) {
    return null;
  }

  return (
    <div className="relative w-full h-full flex flex-col min-h-[600px]">
      {/* Crop Area - Full Screen */}
      <div className="relative flex-1 bg-gray-900 rounded-2xl overflow-hidden min-h-[600px]">
        <Cropper
          image={currentImage.preview}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              borderRadius: '1rem',
              width: '100%',
              height: '100%',
            }
          }}
        />

        {/* Floating Controls - Top Right */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setRotation((rotation - 90 + 360) % 360)}
            className="w-10 h-10 bg-black/50 backdrop-blur-md hover:bg-black/70
              text-white rounded-xl flex items-center justify-center
              transition-all duration-200 hover:scale-110"
            title={t('crop.rotate_left')}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={() => setRotation((rotation + 90) % 360)}
            className="w-10 h-10 bg-black/50 backdrop-blur-md hover:bg-black/70
              text-white rounded-xl flex items-center justify-center
              transition-all duration-200 hover:scale-110"
            title={t('crop.rotate_right')}
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Export Button - Bottom Center */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          <button
            onClick={handleExport}
            disabled={isExporting || !croppedArea}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-indigo-600
              hover:from-primary-700 hover:to-indigo-700
              text-white font-semibold rounded-full
              shadow-2xl hover:shadow-3xl
              transform hover:scale-105 active:scale-95
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            {isExporting ? t('export.exporting') : t('crop.export')}
          </button>
        </div>
      </div>
    </div>
  );
}
