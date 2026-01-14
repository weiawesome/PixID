import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ImageFile, ImageContextValue, CropState } from '../types';
import { fileToBase64 } from '../utils/imageProcessing';
import { isHeicFile } from '../utils/validation';
import { convertHeicToJpeg } from '../utils/heicConverter';

const ImageContext = createContext<ImageContextValue | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [currentImageId, setCurrentImageId] = useState<string | null>(null);

  const addImages = useCallback(async (files: File[]) => {
    const newImages: ImageFile[] = [];

    for (const file of files) {
      try {
        let processedFile = file;
        
        // Convert HEIC/HEIF files to JPEG
        if (isHeicFile(file)) {
          try {
            processedFile = await convertHeicToJpeg(file);
          } catch (error) {
            console.error('Failed to convert HEIC file:', error);
            continue; // Skip this file if conversion fails
          }
        }
        
        const preview = await fileToBase64(processedFile);
        const imageFile: ImageFile = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file: processedFile,
          preview,
          name: processedFile.name,
          size: processedFile.size,
          type: processedFile.type,
          cropState: {
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1,
            rotation: 0,
            croppedAreaPixels: null,
          },
        };
        newImages.push(imageFile);
      } catch (error) {
        console.error('Failed to process image:', error);
      }
    }

    setImages((prev) => [...prev, ...newImages]);

    // Set first new image as current if no image is selected
    if (!currentImageId && newImages.length > 0) {
      setCurrentImageId(newImages[0].id);
    }
  }, [currentImageId]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);

      // If removed image was current, select another one
      if (currentImageId === id) {
        setCurrentImageId(filtered.length > 0 ? filtered[0].id : null);
      }

      return filtered;
    });
  }, [currentImageId]);

  const setCurrentImage = useCallback((id: string) => {
    setCurrentImageId(id);
  }, []);

  const updateImageCropState = useCallback((id: string, cropState: CropState) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, cropState } : img
      )
    );
  }, []);

  const updateImageBackground = useCallback((
    id: string,
    backgroundRemoved: boolean,
    backgroundColor?: string
  ) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? { ...img, backgroundRemoved, backgroundColor }
          : img
      )
    );
  }, []);

  const clearAll = useCallback(() => {
    setImages([]);
    setCurrentImageId(null);
  }, []);

  const value: ImageContextValue = {
    images,
    currentImageId,
    addImages,
    removeImage,
    setCurrentImage,
    updateImageCropState,
    updateImageBackground,
    clearAll,
  };

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
}

export function useImageContext() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within ImageProvider');
  }
  return context;
}
