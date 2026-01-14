import type { CropArea, ExportOptions } from '../types';

/**
 * Create an image element from a URL
 */
export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

/**
 * Get rotated image dimensions
 */
export function getRotatedImageSize(
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } {
  const rotRad = (rotation * Math.PI) / 180;
  const rotatedWidth =
    Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height);
  const rotatedHeight =
    Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height);

  return {
    width: rotatedWidth,
    height: rotatedHeight,
  };
}

/**
 * Crop image and return Blob
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CropArea,
  rotation = 0,
  options: ExportOptions
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const rotatedSize = getRotatedImageSize(image.width, image.height, rotation);

  // Set canvas size
  canvas.width = rotatedSize.width;
  canvas.height = rotatedSize.height;

  // Draw rotated image
  ctx.translate(rotatedSize.width / 2, rotatedSize.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  // Extract cropped area
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // Resize canvas to cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Clear and draw cropped image
  ctx.putImageData(data, 0, 0);

  // Apply scaling if maxWidth or maxHeight is set
  if (options.maxWidth || options.maxHeight) {
    const scale = Math.min(
      options.maxWidth ? options.maxWidth / pixelCrop.width : 1,
      options.maxHeight ? options.maxHeight / pixelCrop.height : 1
    );

    if (scale < 1) {
      const scaledCanvas = document.createElement('canvas');
      const scaledCtx = scaledCanvas.getContext('2d');
      if (!scaledCtx) throw new Error('No 2d context');

      scaledCanvas.width = pixelCrop.width * scale;
      scaledCanvas.height = pixelCrop.height * scale;
      scaledCtx.drawImage(canvas, 0, 0, scaledCanvas.width, scaledCanvas.height);

      return new Promise((resolve, reject) => {
        scaledCanvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Canvas to Blob failed'));
          },
          options.format,
          options.quality
        );
      });
    }
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas to Blob failed'));
      },
      options.format,
      options.quality
    );
  });
}

/**
 * Download image
 */
export function downloadImage(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Convert image file to base64 URL
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
