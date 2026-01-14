import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, IdCard, Check } from 'lucide-react';
import { SOCIAL_MEDIA_PRESETS, ID_PHOTO_PRESETS } from '../../config/presetSizes';
import { useCropContext } from '../../contexts/CropContext';
import type { PresetSize } from '../../types';
import Modal from '../common/Modal';

export default function PresetSizes() {
  const { t } = useTranslation();
  const { setAspect } = useCropContext();
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [isIdPhotoModalOpen, setIsIdPhotoModalOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handlePresetClick = (preset: PresetSize) => {
    setAspect(preset.aspectRatio);
    setSelectedPreset(preset.id);
    setIsSocialModalOpen(false);
    setIsIdPhotoModalOpen(false);
  };

  const PresetButton = ({ preset }: { preset: PresetSize }) => (
    <button
      type="button"
      onClick={() => handlePresetClick(preset)}
      className={`group relative w-full text-left px-4 py-3 rounded-xl border
        transition-all duration-200
        transform hover:scale-[1.02] active:scale-[0.98]
        ${
          selectedPreset === preset.id
            ? 'border-primary-500 bg-primary-50 shadow-md'
            : 'border-gray-200 hover:border-primary-300 bg-white hover:bg-gray-50'
        }`}
    >
      {selectedPreset === preset.id && (
        <div className="absolute top-2 right-2">
          <Check className="w-4 h-4 text-primary-600" />
        </div>
      )}
      <div className="font-medium text-gray-900 text-sm">{t(preset.nameKey)}</div>
      <div className="text-xs text-gray-500 mt-0.5">{preset.width}×{preset.height}</div>
    </button>
  );

  return (
    <>
      {/* Floating Preset Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <button
          onClick={() => setIsSocialModalOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600
            hover:from-blue-600 hover:to-indigo-700
            text-white rounded-full shadow-2xl
            flex items-center justify-center
            transform hover:scale-110 active:scale-95
            transition-all duration-200"
          title="社交媒体"
        >
          <Users className="w-6 h-6" />
        </button>

        <button
          onClick={() => setIsIdPhotoModalOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600
            hover:from-purple-600 hover:to-pink-700
            text-white rounded-full shadow-2xl
            flex items-center justify-center
            transform hover:scale-110 active:scale-95
            transition-all duration-200"
          title="证件照"
        >
          <IdCard className="w-6 h-6" />
        </button>
      </div>

      {/* Social Media Modal */}
      <Modal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        title={t('presets.social_media')}
      >
        <div className="grid grid-cols-2 gap-2">
          {SOCIAL_MEDIA_PRESETS.map((preset) => (
            <PresetButton key={preset.id} preset={preset} />
          ))}
        </div>
      </Modal>

      {/* ID Photo Modal */}
      <Modal
        isOpen={isIdPhotoModalOpen}
        onClose={() => setIsIdPhotoModalOpen(false)}
        title={t('presets.id_photos')}
      >
        <div className="grid grid-cols-2 gap-2">
          {ID_PHOTO_PRESETS.map((preset) => (
            <PresetButton key={preset.id} preset={preset} />
          ))}
        </div>
      </Modal>
    </>
  );
}
