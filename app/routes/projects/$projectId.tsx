import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getProjectById } from "~/models/project";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data || !data.project) {
		return [{ title: "프로젝트를 찾을 수 없음 | 한규 포트폴리오" }, { name: "description", content: "요청하신 프로젝트를 찾을 수 없습니다." }];
	}

	return [
		{ title: `${data.project.title} | 한규 포트폴리오` },
		{ name: "description", content: data.project.description },
		{ property: "og:title", content: data.project.title },
		{ property: "og:description", content: data.project.description },
		{ property: "og:image", content: data.project.thumbnail },
		{ property: "og:type", content: "article" },
	];
};

export async function loader({ params }: LoaderFunctionArgs) {
	const projectId = params.projectId;

	if (!projectId) {
		throw new Response("프로젝트 ID가 필요합니다", { status: 400 });
	}

	const project = getProjectById(projectId);

	if (!project) {
		throw new Response("프로젝트를 찾을 수 없습니다", { status: 404 });
	}

	return json({ project });
}

export function ErrorBoundary() {
	return (
		<div className="container mx-auto px-4 py-16 text-center">
			<h1 className="text-3xl font-bold mb-6">프로젝트를 찾을 수 없습니다</h1>
			<p className="text-gray-600 dark:text-gray-400 mb-8">요청하신 프로젝트가 존재하지 않거나 삭제되었을 수 있습니다.</p>
			<div className="flex justify-center gap-4">
				<Link to="/projects" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
					모든 프로젝트 보기
				</Link>
				<Link to="/" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors">
					홈으로 돌아가기
				</Link>
			</div>
		</div>
	);
}

export default function ProjectDetails() {
	const { project } = useLoaderData<typeof loader>();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
	};

	const goToImage = (index: number) => {
		setCurrentImageIndex(index);
	};

	return (
		<div className="container mx-auto px-4 py-16">
			{/* 뒤로가기 링크 */}
			<div className="mb-8">
				<Link to="/projects" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					모든 프로젝트로 돌아가기
				</Link>
			</div>

			{/* 프로젝트 헤더 */}
			<div className="mb-12">
				<div className="flex flex-wrap items-center justify-between mb-4">
					<h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
					<span className="text-gray-600 dark:text-gray-400 text-sm">
						{new Date(project.date).toLocaleDateString("ko-KR", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>
				<p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>

				{/* 기술 스택 뱃지 */}
				<div className="flex flex-wrap gap-2 mb-8">
					{project.technologies.map((tech) => (
						<span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
							{tech}
						</span>
					))}
				</div>

				{/* 프로젝트 링크 */}
				<div className="flex flex-wrap gap-3">
					{project.demoUrl && (
						<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
							데모 보기
						</a>
					)}

					{project.sourceUrl && (
						<a
							href={project.sourceUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="px-5 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg flex items-center transition-colors"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
							</svg>
							소스 코드
						</a>
					)}
				</div>
			</div>

			{/* 프로젝트 이미지 슬라이더 */}
			<div className="mb-12">
				<div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
					{/* 슬라이더 */}
					<div className="relative w-full h-full overflow-hidden">
						<AnimatePresence initial={false} mode="wait">
							<motion.img
								key={currentImageIndex}
								src={project.images[currentImageIndex]}
								alt={`${project.title} 이미지 ${currentImageIndex + 1}`}
								className="w-full h-full object-contain"
								initial={{
									opacity: 0,
									scale: 0.95,
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
									scale: 0.95,
									transition: {
										duration: 0.2,
										ease: "easeInOut",
									},
								}}
							/>
						</AnimatePresence>
					</div>

					{/* 이전/다음 버튼 */}
					<motion.button
						onClick={prevImage}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
						whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
						whileTap={{ scale: 0.95 }}
						aria-label="이전 이미지"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</motion.button>

					<motion.button
						onClick={nextImage}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
						whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
						whileTap={{ scale: 0.95 }}
						aria-label="다음 이미지"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</motion.button>
				</div>

				{/* 이미지 인디케이터 */}
				<div className="flex justify-center mt-4 gap-2">
					{project.images.map((_, index) => (
						<motion.button
							key={index}
							onClick={() => goToImage(index)}
							className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-blue-600 dark:bg-blue-500 scale-125" : "bg-gray-300 dark:bg-gray-600"} transition-all`}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
							aria-label={`이미지 ${index + 1}로 이동`}
						/>
					))}
				</div>
			</div>

			{/* 프로젝트 상세 설명 */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-4">프로젝트 개요</h2>
				<div className="prose prose-lg dark:prose-invert max-w-none">
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{project.fullDescription}</p>
				</div>
			</div>
		</div>
	);
}
