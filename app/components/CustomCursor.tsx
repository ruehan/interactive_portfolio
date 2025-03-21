import { useEffect, useState } from 'react';
import { useThemeStore } from '~/store/themeStore';

/**
 * 사용자 정의 마우스 커서 컴포넌트
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const theme = useThemeStore(state => state.theme);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onMouseEnterLink = () => setLinkHovered(true);
    const onMouseLeaveLink = () => setLinkHovered(false);

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [role=button]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    window.addEventListener('load', addLinkListeners);
    addLinkListeners();

    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('load', addLinkListeners);
      observer.disconnect();
    };
  }, []);

  const cursorClasses = `
    pointer-events-none fixed transform -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference
    rounded-full transition-transform duration-150 ease-out
    ${clicked ? 'scale-75' : ''}
    ${linkHovered ? 'scale-150' : ''}
    ${hidden ? 'opacity-0' : 'opacity-100'}
  `;

  const cursorColor = theme === 'dark' ? 'bg-white' : 'bg-black';

  return (
    <div
      className={`${cursorClasses} ${cursorColor}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '24px',
        height: '24px',
      }}
    />
  );
}
