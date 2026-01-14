export interface BackgroundColor {
  id: string;
  name: string;
  nameKey: string; // i18n key
  hex: string;
  rgb: { r: number; g: number; b: number };
}

export interface BackgroundRemovalOptions {
  removeBackground: boolean;
  replaceWithColor?: string;
}

export interface BackgroundRemovalResult {
  blob: Blob;
  url: string;
}
