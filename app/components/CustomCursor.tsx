import { useEffect, useState } from "react";
import { useThemeStore } from "~/store/themeStore";

/**
 * 사용자 정의 마우스 커서 컴포넌트
 */
export default function CustomCursor() {
	const [position, setPosition] = useState({ x: -100, y: -100 });
	const [clicked, setClicked] = useState(false);
	const [linkHovered, setLinkHovered] = useState(false);
	const [hidden, setHidden] = useState(false);
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		// 마우스 이동 이벤트 핸들러
		const onMouseMove = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};

		// 마우스 클릭 이벤트 핸들러
		const onMouseDown = () => setClicked(true);
		const onMouseUp = () => setClicked(false);

		// 링크 호버 이벤트 핸들러
		const onMouseEnterLink = () => setLinkHovered(true);
		const onMouseLeaveLink = () => setLinkHovered(false);

		// 마우스가 창을 벗어난 경우 커서 숨기기
		const onMouseLeave = () => setHidden(true);
		const onMouseEnter = () => setHidden(false);

		// 모든 링크 및 버튼 요소에 호버 이벤트 리스너 추가
		const addLinkListeners = () => {
			document.querySelectorAll("a, button, [role=button]").forEach((el) => {
				el.addEventListener("mouseenter", onMouseEnterLink);
				el.addEventListener("mouseleave", onMouseLeaveLink);
			});
		};

		// 이벤트 리스너 등록
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mouseleave", onMouseLeave);
		document.addEventListener("mouseenter", onMouseEnter);

		// 링크 리스너 추가 (DOM이 완전히 로드된 후)
		window.addEventListener("load", addLinkListeners);
		// 초기 실행을 위해서도 한번 실행
		addLinkListeners();

		// MutationObserver를 사용하여 DOM 변경 시 링크 리스너를 다시 추가
		const observer = new MutationObserver(addLinkListeners);
		observer.observe(document.body, { childList: true, subtree: true });

		// 컴포넌트 언마운트 시 이벤트 리스너 및 옵저버 제거
		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mouseup", onMouseUp);
			document.removeEventListener("mouseleave", onMouseLeave);
			document.removeEventListener("mouseenter", onMouseEnter);
			window.removeEventListener("load", addLinkListeners);
			observer.disconnect();
		};
	}, []);

	// 커서 스타일 클래스 계산
	const cursorClasses = `
    pointer-events-none fixed transform -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference
    rounded-full transition-transform duration-150 ease-out
    ${clicked ? "scale-75" : ""}
    ${linkHovered ? "scale-150" : ""}
    ${hidden ? "opacity-0" : "opacity-100"}
  `;

	// 테마에 따른 커서 색상 결정
	const cursorColor = theme === "dark" ? "bg-white" : "bg-black";

	return (
		<div
			className={`${cursorClasses} ${cursorColor}`}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				width: "24px",
				height: "24px",
			}}
		/>
	);
}
