import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'
import App from './App.tsx'
import { ImageProvider } from './contexts/ImageContext'
import { CropProvider } from './contexts/CropContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImageProvider>
      <CropProvider>
        <App />
      </CropProvider>
    </ImageProvider>
  </StrictMode>,
)
