import { removeBackground } from '@imgly/background-removal';
import type { BackgroundRemovalResult } from '../types';
import { createImage } from './imageProcessing';

/**
 * Remove background from image
 */
export async function removeImageBackground(imageSrc: string): Promise<BackgroundRemovalResult> {
  try {
    const blob = await removeBackground(imageSrc);
    const url = URL.createObjectURL(blob);

    return { blob, url };
  } catch (error) {
    console.error('Background removal failed:', error);
    throw new Error('Background removal failed');
  }
}

/**
 * Replace background with solid color
 */
export async function replaceBackground(
  imageSrc: string,
  backgroundColor: string
): Promise<Blob> {
  try {
    // Remove background first
    const removedBg = await removeBackground(imageSrc);

    // Create image from blob
    const bgRemovedUrl = URL.createObjectURL(removedBg);
    const img = await createImage(bgRemovedUrl);

    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    // Set canvas size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw image with removed background on top
    ctx.drawImage(img, 0, 0);

    // Clean up
    URL.revokeObjectURL(bgRemovedUrl);

    // Convert to blob
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas to Blob failed'));
      }, 'image/png');
    });
  } catch (error) {
    console.error('Background replacement failed:', error);
    throw new Error('Background replacement failed');
  }
}

/**
 * Check if background removal is supported in the current environment
 */
export function isBackgroundRemovalSupported(): boolean {
  // Check if we're in a browser environment with necessary APIs
  return typeof document !== 'undefined' &&
         typeof HTMLCanvasElement !== 'undefined' &&
         typeof WebAssembly !== 'undefined';
}
