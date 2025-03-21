// 우주 배경 컴포넌트
export default function InteractiveBackground() {
	return (
		<div className="fixed inset-0 z-0 opacity-100 dark:opacity-100 space-gradient">
			{" "}
			{/* 우주 그라데이션 배경 적용 */}
			<div className="absolute inset-0 stars-container overflow-hidden">
				{/* 작은 별들 (80개) */}
				{[...Array(40)].map((_, i) => (
					<div
						key={`star-${i}`}
						className="absolute rounded-full animate-twinkle"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							opacity: "var(--star-opacity)",
							width: `${Math.random() * 1.5 + 0.8}px`,
							height: `${Math.random() * 1.5 + 0.8}px`,
							animationDelay: `${Math.random() * 10}s`,
							animationDuration: `${Math.random() * 5 + 3}s`,
							backgroundColor: "var(--star-color)",
						}}
					/>
				))}

				{/* 조금 더 큰 별들 (20개) - 움직임 효과 추가 */}
				{[...Array(10)].map((_, i) => (
					<div
						key={`big-star-${i}`}
						className="absolute rounded-full animate-twinkle animate-float"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							width: `${Math.random() * 2.5 + 1.5}px`,
							height: `${Math.random() * 2.5 + 1.5}px`,
							opacity: "var(--star-opacity)",
							animationDelay: `${Math.random() * 5}s`,
							animationDuration: `${Math.random() * 5 + 5}s`,
							backgroundColor: "var(--star-color)",
						}}
					/>
				))}

				{/* 유성 (5개) */}
				{[...Array(5)].map((_, i) => (
					<div
						key={`shooting-star-${i}`}
						className="shooting-star"
						style={{
							top: `${Math.random() * 50}%`,
							left: `${Math.random() * 50}%`,
							animationDelay: `${Math.random() * 15 + 5}s`,
							animationDuration: `${Math.random() * 3 + 2}s`,
							transform: `rotate(${Math.random() * 45 + 20}deg)`,
							background: "linear-gradient(45deg, var(--star-color), transparent)",
							width: "3px",
							height: "3px",
						}}
					/>
				))}

				{/* 성운 효과 (7개) */}
				{[...Array(7)].map((_, i) => (
					<div
						key={`nebula-${i}`}
						className="absolute rounded-full blur-3xl"
						style={{
							width: `${Math.random() * 300 + 200}px`,
							height: `${Math.random() * 300 + 200}px`,
							background: `radial-gradient(circle, var(--nebula-color) 0%, transparent 70%)`,
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							opacity: 0.5,
						}}
					/>
				))}
			</div>
		</div>
	);
}
