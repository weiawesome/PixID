export type PresetCategory = 'social' | 'id-photo';

export interface PresetSize {
  id: string;
  category: PresetCategory;
  name: string;
  nameKey: string; // i18n key
  width: number;
  height: number;
  aspectRatio: number;
  description?: string;
  descriptionKey?: string;
  dpi?: number;
}
