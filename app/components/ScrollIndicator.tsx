import { useEffect, useState } from "react";

/**
 * 스크롤 진행 상태를 보여주는 인디케이터 컴포넌트
 */
export default function ScrollIndicator() {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			// 전체 문서 높이에서 창 높이를 뺀 값이 최대 스크롤 가능 거리
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
			// 현재 스크롤 위치를 최대 스크롤 가능 거리로 나누어 진행률 계산
			const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
			setScrollProgress(progress);
		};

		// 스크롤 이벤트 리스너 등록
		window.addEventListener("scroll", handleScroll);

		// 초기 스크롤 진행률 설정
		handleScroll();

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			window.removeEventListener("scroll", handleScroll);
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
