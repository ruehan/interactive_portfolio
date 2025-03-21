import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type Skill = {
	name: string;
	level: number;
	color: string;
};

interface SkillChartProps {
	skills: Skill[];
	size?: number;
	labelColor?: string;
}

export default function SkillChart({ skills, size = 300, labelColor = "white" }: SkillChartProps) {
	const [mounted, setMounted] = useState(false);
	const centerX = size / 2;
	const centerY = size / 2;
	const radius = size * 0.4;

	const angleStep = (Math.PI * 2) / skills.length;

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div style={{ width: size, height: size }}></div>;
	}

	const createGrid = () => {
		const gridLines = [];
		const levels = 5;

		for (let i = 1; i <= levels; i++) {
			const gridRadius = (radius * i) / levels;
			const points = skills.map((_, idx) => {
				const angle = -Math.PI / 2 + idx * angleStep;
				const x = centerX + gridRadius * Math.cos(angle);
				const y = centerY + gridRadius * Math.sin(angle);
				return `${x},${y}`;
			});

			gridLines.push(<polygon key={`grid-${i}`} points={points.join(" ")} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />);
		}

		skills.forEach((_, idx) => {
			const angle = -Math.PI / 2 + idx * angleStep;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);

			gridLines.push(<line key={`axis-${idx}`} x1={centerX} y1={centerY} x2={x} y2={y} stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />);
		});

		return gridLines;
	};

	const calculatePoints = () => {
		return skills.map((skill, idx) => {
			const angle = -Math.PI / 2 + idx * angleStep;
			const skillRadius = (radius * skill.level) / 100;
			const x = centerX + skillRadius * Math.cos(angle);
			const y = centerY + skillRadius * Math.sin(angle);
			return { x, y, ...skill };
		});
	};

	const dataPoints = calculatePoints();
	const polygonPoints = dataPoints.map((point) => `${point.x},${point.y}`).join(" ");

	return (
		<div className="relative">
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				{/* 그리드 그리기 */}
				{createGrid()}

				{/* 스킬 다각형 */}
				<motion.polygon
					initial={{ opacity: 0, scale: 0 }}
					animate={{ opacity: 0.7, scale: 1 }}
					transition={{ duration: 1, ease: "easeOut" }}
					points={polygonPoints}
					fill="rgba(59, 130, 246, 0.3)"
					stroke="#3b82f6"
					strokeWidth="2"
				/>

				{/* 데이터 포인트 */}
				{dataPoints.map((point, idx) => (
					<motion.circle
						key={`point-${idx}`}
						initial={{ opacity: 0, r: 0 }}
						animate={{ opacity: 1, r: 5 }}
						transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
						cx={point.x}
						cy={point.y}
						fill={point.color}
						stroke="white"
						strokeWidth="1"
					/>
				))}

				{/* 레이블 */}
				{skills.map((skill, idx) => {
					const angle = -Math.PI / 2 + idx * angleStep;
					const labelRadius = radius + 20;
					const x = centerX + labelRadius * Math.cos(angle);
					const y = centerY + labelRadius * Math.sin(angle);

					const textAnchor = Math.abs(angle - 0) < 0.1 || Math.abs(angle - Math.PI) < 0.1 ? "middle" : angle > 0 && angle < Math.PI ? "start" : "end";

					return (
						<motion.text
							key={`label-${idx}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
							x={x}
							y={y}
							textAnchor={textAnchor}
							dominantBaseline="middle"
							fill={labelColor}
							fontSize="12"
							fontWeight="bold"
						>
							{skill.name}
						</motion.text>
					);
				})}
			</svg>
		</div>
	);
}
