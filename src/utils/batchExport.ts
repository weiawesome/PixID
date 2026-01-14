import JSZip from 'jszip';
import type { CropArea, ExportOptions, PresetSize } from '../types';
import { getCroppedImg } from './imageProcessing';

/**
 * Export multiple sizes of the same image
 */
export async function exportMultipleSizes(
  imageSrc: string,
  croppedArea: CropArea,
  selectedSizes: PresetSize[],
  options: ExportOptions
): Promise<Blob> {
  const zip = new JSZip();

  for (const size of selectedSizes) {
    try {
      const blob = await getCroppedImg(
        imageSrc,
        croppedArea,
        0,
        {
          ...options,
          maxWidth: size.width,
          maxHeight: size.height,
        }
      );

      const extension = options.format.split('/')[1];
      const fileName = `${size.id}_${size.width}x${size.height}.${extension}`;
      zip.file(fileName, blob);
    } catch (error) {
      console.error(`Failed to export size ${size.name}:`, error);
      // Continue with other sizes even if one fails
    }
  }

  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Export a single size with custom file name
 */
export async function exportSingleSize(
  imageSrc: string,
  croppedArea: CropArea,
  size: PresetSize,
  options: ExportOptions
): Promise<{ blob: Blob; fileName: string }> {
  const blob = await getCroppedImg(
    imageSrc,
    croppedArea,
    0,
    {
      ...options,
      maxWidth: size.width,
      maxHeight: size.height,
    }
  );

  const extension = options.format.split('/')[1];
  const fileName = options.fileName || `${size.id}_${size.width}x${size.height}.${extension}`;

  return { blob, fileName };
}

/**
 * Generate file name for export
 */
export function generateFileName(
  preset: PresetSize,
  format: 'image/jpeg' | 'image/png' | 'image/webp'
): string {
  const extension = format.split('/')[1];
  const timestamp = new Date().getTime();
  return `pixid_${preset.id}_${timestamp}.${extension}`;
}
