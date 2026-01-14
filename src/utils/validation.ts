const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

function isHeicFile(file: File): boolean {
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  return (
    fileName.endsWith('.heic') ||
    fileName.endsWith('.heif') ||
    fileType === 'image/heic' ||
    fileType === 'image/heif'
  );
}

export function validateImageFile(file: File): ValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'upload.error.file_too_large',
    };
  }

  // Check file format - support HEIC/HEIF files
  if (isHeicFile(file)) {
    return { valid: true };
  }

  // Check other supported formats
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    // Also check by file extension as fallback
    const fileName = file.name.toLowerCase();
    const hasValidExtension = SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      return {
        valid: false,
        error: 'upload.error.invalid_format',
      };
    }
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function isSupportedFormat(fileType: string): boolean {
  return SUPPORTED_FORMATS.includes(fileType) || 
         fileType === 'image/heic' || 
         fileType === 'image/heif';
}

export { isHeicFile };

export function getMaxFileSize(): number {
  return MAX_FILE_SIZE;
}
