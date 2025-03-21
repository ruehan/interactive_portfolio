import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingAnimationProps {
	text: string;
	delay?: number;
	className?: string;
}

export function TypingAnimation({ text, className = "" }: TypingAnimationProps) {
	// 텍스트 내용을 직접 렌더링
	// 라이브러리 없이 간단한 방식으로 구현
	return (
		<span className={`inline-block ${className}`}>
			{text}
			<span className="border-r-2 border-blue-500 animate-pulse">&nbsp;</span>
		</span>
	);
}

interface MultiLanguageTextProps {
	texts: string[];
	interval?: number;
	className?: string;
}

export function MultiLanguageText({ texts, interval = 3000, className = "" }: MultiLanguageTextProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % texts.length);
			}, 500); // 페이드 아웃 후 텍스트 변경
		}, interval);

		return () => clearInterval(timer);
	}, [interval, texts.length]);

	return (
		<div className="relative h-[1.5em]">
			<motion.div
				key={currentIndex} // 키가 변경될 때마다 모션 다시 실행
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
				className={`absolute ${className}`}
			>
				{texts[currentIndex]}
			</motion.div>
		</div>
	);
}

interface RotatingImageProps {
	imageSrc: string;
	alt: string;
	className?: string;
}

export function RotatingProfileImage({ imageSrc, alt, className = "" }: RotatingImageProps) {
	return (
		<div className={`perspective-800 ${className}`}>
			<motion.div
				className="w-full h-full"
				animate={{
					rotateY: [0, 360],
					rotateX: [0, 15, 0, -15, 0],
				}}
				transition={{
					rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
					rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
				}}
			>
				<img src={imageSrc} alt={alt} className="w-full h-full object-cover rounded-full shadow-lg" />
			</motion.div>
		</div>
	);
}
