import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { motion } from "framer-motion";
import { useRef } from "react";

import InteractiveBackground from "~/components/InteractiveBackground";
import { MultiLanguageText, RotatingProfileImage } from "~/components/TextAnimation";
import TechStack from "~/components/TechStack";

export const meta: MetaFunction = () => {
	return [
		{ title: "한규 | 풀스택 개발자 포트폴리오" },
		{ name: "description", content: "Remix, React, Node.js를 활용한 풀스택 개발자 한규의 포트폴리오 사이트입니다." },
		{ name: "keywords", content: "풀스택 개발자, Remix, React, TypeScript, 포트폴리오" },
		{ name: "author", content: "한규" },
		{ property: "og:title", content: "한규 | 풀스택 개발자 포트폴리오" },
		{ property: "og:description", content: "Remix, React, Node.js를 활용한 풀스택 개발자 한규의 포트폴리오 사이트입니다." },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: "https://hangyu-portfolio.example.com" },
		{ property: "og:image", content: "https://hangyu-portfolio.example.com/images/og-image.jpg" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: "한규 | 풀스택 개발자 포트폴리오" },
		{ name: "twitter:description", content: "Remix, React, Node.js를 활용한 풀스택 개발자 한규의 포트폴리오 사이트입니다." },
		{ name: "twitter:image", content: "https://hangyu-portfolio.example.com/images/twitter-image.jpg" },
	];
};

// 다국어 직함 텍스트
const multiLanguageTitles = ["풀스택 개발자", "Full Stack Developer", "フルスタック開発者", "Desarrollador Full Stack", "Développeur Full Stack", "全栈开发工程师"];

// 아웃렛 컨텍스트 타입 정의
interface OutletContext {
	theme: string | null;
	toggleTheme: () => void;
}

export default function Index() {
	// 컨텍스트 사용
	useOutletContext<OutletContext>();
	const heroRef = useRef<HTMLDivElement>(null);

	return (
		<main className="min-h-screen text-gray-800 dark:text-gray-200 overflow-x-hidden">
			{/* 인터랙티브 배경 */}
			<InteractiveBackground />

			{/* 히어로 섹션 */}
			<section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 pb-32 px-4 sm:px-6 lg:px-8">
				<div className="relative z-10 max-w-5xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="text-center lg:text-left">
							<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
								<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
									안녕하세요, <br className="hidden sm:block" />
									<span className="text-blue-600 dark:text-blue-400 font-extrabold">한규</span> 입니다
								</h1>
							</motion.div>

							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }}>
								<div className="text-xl sm:text-2xl mb-8">
									저는{" "}
									<span className="text-blue-600 dark:text-blue-400 font-semibold">
										<MultiLanguageText texts={multiLanguageTitles} interval={2000} />
									</span>{" "}
									입니다
								</div>
							</motion.div>

							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.5 }}>
								<p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
									Remix, React, TypeScript를 활용한 현대적인 웹 애플리케이션 개발에 열정을 가지고 있습니다. 직관적인 UI와 최적화된 사용자 경험을 구현하기 위해 노력합니다.
								</p>
							</motion.div>

							<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.8 }} className="flex flex-wrap gap-4 justify-center lg:justify-start">
								<a href="#projects" className="px-6 py-3 rounded-lg bg-black/70 text-white font-medium hover:bg-black/90 transition-colors border border-gray-500/30">
									프로젝트 보기
								</a>
								<a href="#contact" className="px-6 py-3 rounded-lg bg-black/50 backdrop-blur-sm text-white font-medium hover:bg-black/70 transition-colors border border-gray-500/30">
									연락하기
								</a>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.8,
								delay: 0.5,
								type: "spring",
								stiffness: 100,
							}}
							className="flex justify-center"
						>
							<div className="relative w-64 h-64 sm:w-80 sm:h-80">
								<RotatingProfileImage imageSrc="/images/profile.jpg" alt="한규 프로필 이미지" className="w-full h-full" />

								{/* 배경 장식 효과 */}
								<div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-20 animate-pulse" />
								<div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-blue-500 blur-xl opacity-10 animate-ping" style={{ animationDuration: "6s" }} />
								<div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-purple-500 blur-xl opacity-10 animate-ping" style={{ animationDuration: "8s" }} />
							</div>
						</motion.div>
					</div>
				</div>

				{/* 스크롤 다운 표시 */}
				<motion.div
					className="absolute bottom-10 left-0 right-0 mx-auto flex justify-center"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 1,
						delay: 2.5,
						repeat: Infinity,
						repeatType: "reverse",
					}}
				>
					<div className="flex flex-col items-center">
						<span className="text-sm text-gray-500 dark:text-gray-400 mb-2">스크롤 다운</span>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</div>
				</motion.div>
			</section>

			{/* 기술 스택 섹션 */}
			<TechStack />

			{/* 푸터 */}
			<footer className="py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-800">
				<div className="container mx-auto px-4">
					<p>&copy; {new Date().getFullYear()} 한규. 모든 권리 보유.</p>
				</div>
			</footer>
		</main>
	);
}
