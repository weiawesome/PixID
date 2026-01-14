export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CropState {
  crop: { x: number; y: number };
  zoom: number;
  aspect: number;
  rotation: number;
  croppedAreaPixels: CropArea | null;
}

export interface CropContextValue extends CropState {
  setCrop: (crop: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
  setAspect: (aspect: number) => void;
  setRotation: (rotation: number) => void;
  setCroppedAreaPixels: (area: CropArea | null) => void;
  resetCrop: () => void;
}
