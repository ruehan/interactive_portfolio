import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

export default function ImageModal({ isOpen, onClose, imageUrl, imageAlt }: ImageModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // 모달이 열리면 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      // 모달이 닫히면 body 스크롤 복원
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-60 rounded-full text-white hover:bg-opacity-80 transition-colors z-10"
              aria-label="닫기"
            >
              <FaTimes />
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
