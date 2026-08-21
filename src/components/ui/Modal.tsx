import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, children, title, maxWidth = 'max-w-2xl' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto scrollbar-hide glass-strong rounded-2xl shadow-2xl animate-scale-in`}>
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-ink-800/90 backdrop-blur-xl rounded-t-2xl">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg flex items-center justify-center text-ink-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
