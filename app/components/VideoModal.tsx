import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectVideo } from '~/models/project';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: ProjectVideo | null;
}

export default function VideoModal({ isOpen, onClose, video }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC 키를 누르면 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // 모달이 열릴 때 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // 모달이 닫힐 때 스크롤 복원
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // 모달 외부 클릭 시 닫기
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={handleOutsideClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
          >
            {/* 비디오 타이틀 */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">{video.title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full"
                aria-label="닫기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 비디오 플레이어 */}
            <div className="relative aspect-video w-full">
              {video.url.startsWith('http') ? (
                // 외부 URL (웹사이트 데모)는 iframe으로 표시
                <iframe
                  src={video.url}
                  className="w-full h-full"
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                ></iframe>
              ) : (
                // 로컬 비디오 파일은 video 요소로 재생
                <video
                  src={video.url}
                  controls
                  autoPlay
                  poster={video.thumbnail}
                  className="w-full h-full object-contain"
                  controlsList="nodownload"
                >
                  <source src={video.url} type="video/mp4" />
                  <track kind="captions" src="" label="한국어" />
                  브라우저가 비디오 재생을 지원하지 않습니다.
                </video>
              )}
            </div>

            {/* 비디오 정보 */}
            <div className="p-4 text-gray-400 text-sm">
              <div className="flex justify-between">
                <span>재생 시간: {video.duration}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
