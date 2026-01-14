import type { BackgroundColor } from '../types';

export const BACKGROUND_COLORS: BackgroundColor[] = [
  {
    id: 'white',
    name: 'White',
    nameKey: 'background.colors.white',
    hex: '#FFFFFF',
    rgb: { r: 255, g: 255, b: 255 }
  },
  {
    id: 'blue',
    name: 'Blue',
    nameKey: 'background.colors.blue',
    hex: '#438EDB',
    rgb: { r: 67, g: 142, b: 219 }
  },
  {
    id: 'red',
    name: 'Red',
    nameKey: 'background.colors.red',
    hex: '#FF0000',
    rgb: { r: 255, g: 0, b: 0 }
  },
  {
    id: 'light_blue',
    name: 'Light Blue',
    nameKey: 'background.colors.light_blue',
    hex: '#B8D4EB',
    rgb: { r: 184, g: 212, b: 235 }
  },
  {
    id: 'gray',
    name: 'Gray',
    nameKey: 'background.colors.gray',
    hex: '#D3D3D3',
    rgb: { r: 211, g: 211, b: 211 }
  }
];

export const DEFAULT_BACKGROUND_COLOR = BACKGROUND_COLORS[0]; // White
