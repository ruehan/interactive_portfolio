import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, PanInfo } from "framer-motion";
import { Link } from "@remix-run/react";
import type { Project } from "~/models/project";

interface ProjectGalleryProps {
	projects: Project[];
	title: string;
}

export default function ProjectGallery({ projects, title }: ProjectGalleryProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);

	// 모션 값 설정
	const x = useMotionValue(0);
	const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);
	const springX = useSpring(x, { stiffness: 400, damping: 30 });

	// 드래그 완료 시 처리
	const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		isDragging.current = false;

		if (info.offset.x > 80 && currentIndex > 0) {
			setTimeout(() => {
				setCurrentIndex(currentIndex - 1);
			}, 50);
		} else if (info.offset.x < -80 && currentIndex < projects.length - 1) {
			setTimeout(() => {
				setCurrentIndex(currentIndex + 1);
			}, 50);
		}
	};

	// 키보드 탐색 지원
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft" && currentIndex > 0) {
				setCurrentIndex(currentIndex - 1);
			} else if (e.key === "ArrowRight" && currentIndex < projects.length - 1) {
				setCurrentIndex(currentIndex + 1);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentIndex, projects.length]);

	// 프로젝트가 없는 경우
	if (projects.length === 0) {
		return (
			<div className="text-center py-20">
				<h2 className="text-2xl font-bold mb-4">{title}</h2>
				<p className="text-gray-600 dark:text-gray-400">표시할 프로젝트가 없습니다.</p>
			</div>
		);
	}

	return (
		<div className="py-12">
			<h2 className="text-3xl font-bold text-center mb-12">{title}</h2>

			<div ref={containerRef} className="relative h-[550px] md:h-[650px] mx-auto overflow-hidden">
				{/* 3D 효과 컨테이너 */}
				<div className="perspective-1000 w-full h-full flex justify-center items-center">
					<AnimatePresence initial={false} mode="wait">
						<motion.div
							key={currentIndex}
							initial={{
								opacity: 0,
								scale: 0.9,
							}}
							animate={{
								opacity: 1,
								scale: 1,
								transition: {
									duration: 0.3,
									ease: "easeInOut",
								},
							}}
							exit={{
								opacity: 0,
								scale: 0.9,
								transition: {
									duration: 0.2,
									ease: "easeInOut",
								},
							}}
							drag="x"
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={0.2}
							onDragStart={() => (isDragging.current = true)}
							onDragEnd={handleDragEnd}
							style={{
								x: springX,
								scale,
							}}
							className="absolute w-[300px] sm:w-[400px] md:w-[500px] cursor-grab active:cursor-grabbing touch-pan-y"
						>
							<ProjectCard project={projects[currentIndex]} />
						</motion.div>
					</AnimatePresence>
				</div>

				{/* 탐색 버튼 */}
				<div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
					{projects.map((_, index) => (
						<button
							key={index}
							className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? "bg-blue-600 dark:bg-blue-500 scale-125" : "bg-gray-300 dark:bg-gray-600"}`}
							onClick={() => {
								setCurrentIndex(index);
							}}
							aria-label={`프로젝트 ${index + 1} 보기`}
						/>
					))}
				</div>

				{/* 이전/다음 화살표 */}
				<button
					className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md z-10 ${
						currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-white dark:hover:bg-gray-800"
					}`}
					onClick={() => {
						if (currentIndex > 0) {
							setCurrentIndex(currentIndex - 1);
						}
					}}
					disabled={currentIndex === 0}
					aria-label="이전 프로젝트"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<button
					className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md z-10 ${
						currentIndex === projects.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-white dark:hover:bg-gray-800"
					}`}
					onClick={() => {
						if (currentIndex < projects.length - 1) {
							setCurrentIndex(currentIndex + 1);
						}
					}}
					disabled={currentIndex === projects.length - 1}
					aria-label="다음 프로젝트"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	);
}

// 프로젝트 카드 컴포넌트
function ProjectCard({ project }: { project: Project }) {
	return (
		<div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out group h-full">
			{/* 썸네일 이미지 */}
			<div className="relative h-52 overflow-hidden">
				<img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

				{/* 기술 뱃지 */}
				<div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1 max-w-[70%]">
					{project.technologies.slice(0, 3).map((tech) => (
						<span key={tech} className="text-xs bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm">
							{tech}
						</span>
					))}
					{project.technologies.length > 3 && <span className="text-xs bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm">+{project.technologies.length - 3}</span>}
				</div>
			</div>

			{/* 프로젝트 정보 */}
			<div className="p-5">
				<span className="text-xs text-gray-500 dark:text-gray-400">
					{new Date(project.date).toLocaleDateString("ko-KR", {
						year: "numeric",
						month: "long",
					})}
				</span>
				<h3 className="text-xl font-bold mt-1 mb-2">{project.title}</h3>
				<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

				{/* 프로젝트 링크 */}
				<div className="flex justify-between items-center">
					<Link to={`/projects/${project.id}`} className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
						자세히 보기
						<span aria-hidden="true"> →</span>
					</Link>

					<div className="flex space-x-2">
						{project.demoUrl && (
							<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="데모 보기">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</a>
						)}

						{project.sourceUrl && (
							<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="소스 코드 보기">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
								</svg>
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// 큐브 형태로 프로젝트를 표시하는 대체 구현
export function ProjectCube({ projects }: { projects: Project[] }) {
	const [currentFace, setCurrentFace] = useState(0);
	const cubeRef = useRef<HTMLDivElement>(null);

	// 큐브 회전
	const rotateCube = (index: number) => {
		setCurrentFace(index);
	};

	// 프로젝트가 6개 미만이면 더미 프로젝트 추가
	const cubeProjects = [...projects];
	while (cubeProjects.length < 6) {
		cubeProjects.push({
			...projects[0],
			id: `dummy-${cubeProjects.length}`,
			title: `더미 프로젝트 ${cubeProjects.length + 1}`,
			description: "더미 프로젝트 설명",
		});
	}

	// 큐브 회전 스타일
	const getCubeTransform = () => {
		switch (currentFace) {
			case 0:
				return "rotateY(0deg)"; // 전면
			case 1:
				return "rotateY(-90deg)"; // 오른쪽
			case 2:
				return "rotateY(-180deg)"; // 뒷면
			case 3:
				return "rotateY(-270deg)"; // 왼쪽
			case 4:
				return "rotateX(-90deg)"; // 위쪽
			case 5:
				return "rotateX(90deg)"; // 아래쪽
			default:
				return "rotateY(0deg)";
		}
	};

	return (
		<div className="py-12">
			<h2 className="text-3xl font-bold text-center mb-12">프로젝트 큐브</h2>

			<div className="relative h-[400px] mx-auto cube-perspective">
				<motion.div
					ref={cubeRef}
					className="w-[300px] h-[300px] relative mx-auto cube-container"
					style={{ transform: `${getCubeTransform()} translateZ(-150px)` }}
					animate={{ scale: [0.95, 1] }}
					transition={{
						duration: 0.5,
						ease: "easeInOut",
						times: [0, 1],
					}}
				>
					{/* 큐브의 6면 */}
					{["front", "right", "back", "left", "top", "bottom"].map((face, index) => (
						<motion.div
							key={face}
							className={`absolute w-full h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cube-face-${face}`}
							whileHover={{ scale: 1.02 }}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						>
							<Link to={`/projects/${cubeProjects[index].id}`} className="block h-full">
								<div className="h-1/2 overflow-hidden rounded-t-lg">
									<img src={cubeProjects[index].thumbnail} alt={cubeProjects[index].title} className="w-full h-full object-cover" />
								</div>
								<div className="p-4">
									<h3 className="text-xl font-bold mb-2 truncate">{cubeProjects[index].title}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{cubeProjects[index].description}</p>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>

			{/* 탐색 버튼 */}
			<div className="flex flex-wrap justify-center gap-2 mt-10">
				{["전면", "오른쪽", "뒷면", "왼쪽", "위", "아래"].map((label, index) => (
					<motion.button
						key={label}
						onClick={() => rotateCube(index)}
						className={`px-3 py-1 rounded-md ${currentFace === index ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{label}
					</motion.button>
				))}
			</div>
		</div>
	);
}
