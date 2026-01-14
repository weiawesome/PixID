import heic2any from 'heic2any';

/**
 * Convert HEIC/HEIF file to JPEG
 */
export async function convertHeicToJpeg(file: File): Promise<File> {
  try {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.92,
    });

    // heic2any can return an array or a single blob
    const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    
    // Create a new File object with the converted blob
    const fileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
    return new File([blob], fileName, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error('HEIC conversion failed:', error);
    throw new Error('Failed to convert HEIC file');
  }
}
