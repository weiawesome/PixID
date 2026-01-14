import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CropState, CropContextValue, CropArea } from '../types';

type CropAction =
  | { type: 'SET_CROP'; payload: { x: number; y: number } }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'SET_ASPECT'; payload: number }
  | { type: 'SET_ROTATION'; payload: number }
  | { type: 'SET_CROPPED_AREA_PIXELS'; payload: CropArea | null }
  | { type: 'RESET_CROP' };

const initialState: CropState = {
  crop: { x: 0, y: 0 },
  zoom: 1,
  aspect: 1,
  rotation: 0,
  croppedAreaPixels: null,
};

function cropReducer(state: CropState, action: CropAction): CropState {
  switch (action.type) {
    case 'SET_CROP':
      return { ...state, crop: action.payload };
    case 'SET_ZOOM':
      return { ...state, zoom: action.payload };
    case 'SET_ASPECT':
      return { ...state, aspect: action.payload };
    case 'SET_ROTATION':
      return { ...state, rotation: action.payload };
    case 'SET_CROPPED_AREA_PIXELS':
      return { ...state, croppedAreaPixels: action.payload };
    case 'RESET_CROP':
      return initialState;
    default:
      return state;
  }
}

const CropContext = createContext<CropContextValue | undefined>(undefined);

export function CropProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cropReducer, initialState);

  const value: CropContextValue = {
    ...state,
    setCrop: (crop) => dispatch({ type: 'SET_CROP', payload: crop }),
    setZoom: (zoom) => dispatch({ type: 'SET_ZOOM', payload: zoom }),
    setAspect: (aspect) => dispatch({ type: 'SET_ASPECT', payload: aspect }),
    setRotation: (rotation) => dispatch({ type: 'SET_ROTATION', payload: rotation }),
    setCroppedAreaPixels: (area) => dispatch({ type: 'SET_CROPPED_AREA_PIXELS', payload: area }),
    resetCrop: () => dispatch({ type: 'RESET_CROP' }),
  };

  return <CropContext.Provider value={value}>{children}</CropContext.Provider>;
}

export function useCropContext() {
  const context = useContext(CropContext);
  if (!context) {
    throw new Error('useCropContext must be used within CropProvider');
  }
  return context;
}
