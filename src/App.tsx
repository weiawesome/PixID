import { Sparkles } from 'lucide-react';
import ImageUploader from './components/ImageUploader/ImageUploader';
import ImageCropper from './components/ImageCropper/ImageCropper';
import PresetSizes from './components/PresetSizes/PresetSizes';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import IntroSection from './components/IntroSection/IntroSection';
import Footer from './components/Footer/Footer';
import { useImageContext } from './contexts/ImageContext';

function App() {
  const { currentImageId, clearAll } = useImageContext();

  const handleLogoClick = () => {
    clearAll();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1 -ml-2"
            aria-label="返回首页"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary-600">
              PixID
            </h1>
          </button>
          <LanguageSwitch />
        </div>
      </header>

      {/* Main Content - Full Screen */}
      <main className="flex-1 pt-20 pb-6 px-6 min-h-0">
        {!currentImageId ? (
          // Upload State
          <div className="max-w-6xl mx-auto h-full flex flex-col items-center justify-center gap-6">
            <IntroSection />
            <ImageUploader />
          </div>
        ) : (
          // Crop State - Full Screen
          <div className="h-full w-full">
            <ImageCropper />
          </div>
        )}
      </main>

      {/* Floating Preset Buttons */}
      <PresetSizes />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
