import { useRef, useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useImageContext } from '../../contexts/ImageContext';
import { validateImageFile } from '../../utils/validation';
import Button from '../common/Button';

export default function ImageUploader() {
  const { t } = useTranslation();
  const { addImages } = useImageContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        alert(t(validation.error!));
      }
    }

    if (validFiles.length > 0) {
      await addImages(validFiles);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    await processFiles(e.target.files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    await processFiles(e.dataTransfer.files);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <ImageIcon className="w-6 h-6 text-primary-600" />
        {t('upload.title')}
      </h2>

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragging
            ? 'border-primary-500 bg-primary-50 scale-105'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
      >
        <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
          <Upload className={`w-16 h-16 mx-auto mb-6 transition-colors duration-300 ${
            isDragging ? 'text-primary-600' : 'text-gray-400'
          }`} />

          <p className="text-gray-700 font-medium text-lg mb-3">{t('upload.drag_drop')}</p>
          <p className="text-base text-gray-500 mb-4">{t('upload.supported_formats')}</p>
          <p className="text-sm text-gray-400 mb-6">{t('upload.max_size')}</p>

          <Button variant="primary" className="pointer-events-none">
            {t('upload.button')}
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload images"
        />
      </div>
    </div>
  );
}
