import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      // Delay animation to allow DOM to update
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-md transition-all duration-300 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal with scale and fade animation */}
      <div
        className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl
          max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col
          border border-white/20
          transform transition-all duration-300 ease-out ${
            isAnimating
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-8'
          }`}
      >
        {/* Header with gradient */}
        <div className="relative flex items-center justify-between p-6 border-b border-gray-200/50
          bg-gradient-to-r from-primary-50/80 to-indigo-50/80 backdrop-blur-sm">
          <div>
            <h2 className="text-xl font-bold text-primary-600">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-all duration-200
              hover:bg-white/80 rounded-xl p-2.5
              transform hover:scale-110 active:scale-95
              hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content with custom scrollbar and glass effect */}
        <div className="p-6 overflow-y-auto flex-1
          scrollbar-thin scrollbar-thumb-primary-300/50 scrollbar-track-transparent
          hover:scrollbar-thumb-primary-400/50">
          {children}
        </div>

        {/* Bottom gradient for visual depth */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
