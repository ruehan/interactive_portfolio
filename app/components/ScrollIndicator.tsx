import { useEffect, useState } from 'react';

/**
 * 스크롤 진행 상태를 보여주는 인디케이터 컴포넌트
 */
export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div
        className="h-full bg-indigo-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
