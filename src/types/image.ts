import type { CropState } from './crop';

export interface ImageFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
  cropState: CropState;
  processedImage?: string;
  backgroundRemoved?: boolean;
  backgroundColor?: string;
}

export interface ExportOptions {
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  quality: number; // 0-1
  maxWidth?: number;
  maxHeight?: number;
  fileName?: string;
}

export interface ImageContextValue {
  images: ImageFile[];
  currentImageId: string | null;
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  setCurrentImage: (id: string) => void;
  updateImageCropState: (id: string, cropState: CropState) => void;
  updateImageBackground: (id: string, backgroundRemoved: boolean, backgroundColor?: string) => void;
  clearAll: () => void;
}
