import { json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Timeline, { type TimelineItem } from "~/components/Timeline";
import SkillChart, { type Skill } from "~/components/SkillChart";
import FlipCard, { type CardContent } from "~/components/FlipCard";

interface PortfolioData {
	developer: {
		name: string;
		title: string;
		bio: string;
		avatar: string;
		links: {
			github: string;
		};
	};
	timeline: TimelineItem[];
	skills: Skill[];
	education: CardContent[];
	experience: CardContent[];
	specialties: {
		id: string;
		name: string;
		icon: string;
		description: string;
	}[];
}

interface OutletContext {
	theme: string | null;
	toggleTheme: () => void;
}

export const loader = async () => {
	const portfolioData: PortfolioData = {
		developer: {
			name: "한규",
			title: "풀스택 개발자",
			bio: "2년차 풀스택 개발자로, React, Node.js, TypeScript와 Python을 주로 사용합니다. 사용자 경험과 성능 최적화에 관심이 많으며, 새로운 기술을 배우고 적용하는 것을 좋아합니다.",
			avatar: "https://avatars.githubusercontent.com/u/65541546?v=4",
			links: {
				github: "https://github.com/ruehan",
			},
		},
		timeline: [
			{
				id: "timeline-1",
				date: "2021",
				title: "첫 개발 직무",
				description: "주니어 백엔드 개발자로 커리어 시작",
				icon: "🚀",
			},
			{
				id: "timeline-2",
				date: "2022",
				title: "프론트엔드 학습",
				description: "Vue.js와 Nuxt.js를 활용한 프론트엔드 개발 경험",
				icon: "🔧",
			},
			{
				id: "timeline-3",
				date: "2023",
				title: "첫 리액트 프로젝트",
				description: "React와 TypeScript를 활용한 프로젝트 참여",
				icon: "⚛️",
			},
			{
				id: "timeline-4",
				date: "2024",
				title: "팀 리드 역할",
				description: "4인 개발팀의 기술 리드 담당",
				icon: "👥",
			},
			{
				id: "timeline-5",
				date: "2024",
				title: "풀스택 개발",
				description: "프론트엔드부터 백엔드까지 통합적인 개발 진행",
				icon: "💻",
			},
		],
		skills: [
			{ name: "React", level: 80, color: "#61dafb" },
			{ name: "Next.js", level: 80, color: "#000000" },
			{ name: "Remix", level: 80, color: "#3f4cf9" },
			{ name: "TypeScript", level: 70, color: "#3178c6" },
			{ name: "JavaScript", level: 90, color: "#f7df1e" },
			{ name: "Tailwind CSS", level: 90, color: "#38b2ac" },
			{ name: "Node.js", level: 50, color: "#339933" },
			{ name: "Python", level: 80, color: "#3776ab" },
			{ name: "FastAPI", level: 90, color: "#000000" },
			{ name: "Flask", level: 90, color: "#47a248" },
			{ name: "Docker", level: 65, color: "#2496ed" },
			{ name: "Git", level: 85, color: "#f05032" },
			{ name: "AWS", level: 60, color: "#ff9900" },
			{ name: "Firebase", level: 65, color: "#ffca28" },
			{ name: "GCP", level: 78, color: "#4285f4" },
			{ name: "MySQL", level: 70, color: "#00618a" },
		],
		education: [
			{
				id: "edu-1",
				front: {
					title: "컴퓨터공학 전문학사",
					subtitle: "동의과학대학교 (2017-2021)",
					image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500",
				},
				back: {
					title: "컴퓨터공학 전문학사",
					description: "알고리즘, 데이터 구조, 운영체제 등 컴퓨터 과학의 핵심 분야 학습",
					details: [
						{ label: "주요 과목", value: "자료구조, 알고리즘, 운영체제" },
						{ label: "졸업 프로젝트", value: "얼굴인식 기반 도어락" },
						{ label: "GPA", value: "4.1/4.5" },
					],
				},
			},
			{
				id: "edu-2",
				front: {
					title: "프로그래머스 프론트엔드 데브코스",
					subtitle: "프로그래머스 (2024)",
					image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500",
				},
				back: {
					title: "프론트엔드 개발 부트캠프",
					description: "6개월 과정으로 실무 중심 웹 개발 역량 강화",
					details: [
						{ label: "프론트엔드", value: "HTML, CSS, JavaScript, React, TypeScript, Next.js, React Native" },
						{ label: "백엔드", value: "FastAPI, MySQL, Python" },
						{ label: "최종 프로젝트", value: "반려동물 산책 앱 DDang" },
					],
				},
			},
		],
		experience: [
			{
				id: "exp-1",
				front: {
					title: "주니어 풀스택 개발자 (연구원)",
					subtitle: "한국전자기술연구원 (2021-2023)",
					image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500",
				},
				back: {
					title: "주니어 풀스택 개발자 (연구원)",
					description: "헬스케어 솔루션 개발 연구 및 알고리즘 개발 / 시각화 웹 구현",
					details: [
						{ label: "주요 기술", value: "Flask, MySQL, Python, Docker, Vue.js" },
						{ label: "성과", value: "가속도 센서 기반의 보행 속도 예측 알고리즘 개발 및 덤벨 동작 예측 알고리즘 개발" },
						{ label: "팀 규모", value: "풀스택 개발자 1명, 임베디드 개발자 1명, 의학 전공 1명, 통신 전공 1명" },
					],
				},
			},
		],
		specialties: [
			{
				id: "spec-1",
				name: "프론트엔드",
				icon: "🎨",
				description: "모던 프론트엔드 기술(React, Vue, Angular)을 활용하여 반응형 웹 애플리케이션 개발에 능숙합니다.",
			},
			{
				id: "spec-2",
				name: "백엔드",
				icon: "⚙️",
				description: "Node.js, Express, NestJS 등을 사용한 확장 가능한 API 개발과 데이터베이스 설계 경험이 있습니다.",
			},
			{
				id: "spec-3",
				name: "DevOps",
				icon: "🔄",
				description: "Docker, CI/CD 파이프라인 구축, AWS 서비스 활용 경험이 있어 개발부터 배포까지 전체 과정을 다룰 수 있습니다.",
			},
			{
				id: "spec-4",
				name: "UI/UX 디자인",
				icon: "🎭",
				description: "사용자 중심 디자인 원칙에 따라 직관적이고 매력적인 인터페이스를 설계할 수 있습니다.",
			},
		],
	};

	return json({ portfolioData });
};

export default function About() {
	const { portfolioData } = useLoaderData<typeof loader>();
	const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
	useOutletContext<OutletContext>();

	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: containerRef });

	const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
	const headerScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.9]);

	const bioRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);
	const skillsRef = useRef<HTMLDivElement>(null);
	const educationRef = useRef<HTMLDivElement>(null);
	const experienceRef = useRef<HTMLDivElement>(null);
	const specialtiesRef = useRef<HTMLDivElement>(null);

	const [activeSection, setActiveSection] = useState<string>("bio");

	useEffect(() => {
		const sections = [
			{ name: "bio", ref: bioRef },
			{ name: "timeline", ref: timelineRef },
			{ name: "skills", ref: skillsRef },
			{ name: "education", ref: educationRef },
			{ name: "experience", ref: experienceRef },
			{ name: "specialties", ref: specialtiesRef },
		];

		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight / 3;

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
					setActiveSection(section.name);
					break;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const getSectionStyle = () => {
		const colors = {
			bio: { primary: "#3b82f6", secondary: "#1d4ed8" },
			timeline: { primary: "#8b5cf6", secondary: "#6d28d9" },
			skills: { primary: "#10b981", secondary: "#059669" },
			education: { primary: "#f59e0b", secondary: "#d97706" },
			experience: { primary: "#ef4444", secondary: "#b91c1c" },
			specialties: { primary: "#ec4899", secondary: "#be185d" },
		};

		const currentSection = activeSection as keyof typeof colors;

		return {
			"--section-color": colors[currentSection].primary,
			"--section-color-dark": colors[currentSection].secondary,
		} as React.CSSProperties;
	};

	const handleSpecialtyClick = (id: string) => {
		setSelectedSpecialty((prev) => (prev === id ? null : id));
	};

	return (
		<div ref={containerRef} className="bg-white dark:bg-gray-900" style={getSectionStyle()}>
			{/* 헤더 섹션 */}
			<motion.div className="relative h-[70vh] flex flex-col items-center justify-center text-center px-4" style={{ opacity: headerOpacity, scale: headerScale }}>
				<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-6">
					<img src={portfolioData.developer.avatar} alt={portfolioData.developer.name} className="w-full h-full object-cover" />
				</div>
				<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2">{portfolioData.developer.name}</h1>
				<h2 className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-6">{portfolioData.developer.title}</h2>
				<div className="flex space-x-4 mb-8">
					<a
						href={portfolioData.developer.links.github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					>
						<span className="sr-only">GitHub</span>
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>
				<div className="animate-bounce absolute bottom-10">
					<svg className="w-8 h-8 text-gray-700 dark:text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
						<path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
					</svg>
				</div>
			</motion.div>

			{/* 소개 섹션 */}
			<section ref={bioRef} className="py-20 px-4 md:px-10 max-w-4xl mx-auto" id="bio">
				<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
					<h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">소개</h2>
					<p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{portfolioData.developer.bio}</p>
				</motion.div>
			</section>

			{/* 타임라인 섹션 */}
			<section ref={timelineRef} className="py-20 px-4 md:px-10 max-w-5xl mx-auto bg-gray-100 dark:bg-gray-800/50" id="timeline">
				<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
					<h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-6 text-center">나의 개발 여정</h2>
				</motion.div>
				<Timeline items={portfolioData.timeline} />
			</section>

			{/* 스킬 섹션 */}
			<section ref={skillsRef} className="py-20 px-4 md:px-10 max-w-4xl mx-auto" id="skills">
				<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
					<h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">기술 역량</h2>
				</motion.div>
				<div className="flex justify-center">
					<SkillChart skills={portfolioData.skills} size={400} labelColor={`var(--foreground)`} />
				</div>
			</section>

			{/* 교육 섹션 */}
			<section ref={educationRef} className="py-20 px-4 md:px-10 max-w-6xl mx-auto bg-gray-100 dark:bg-gray-800/50" id="education">
				<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
					<h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-6 text-center">교육</h2>
				</motion.div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{portfolioData.education.map((edu) => (
						<FlipCard key={edu.id} card={edu} />
					))}
				</div>
			</section>

			{/* 경력 섹션 */}
			<section ref={experienceRef} className="py-20 px-4 md:px-10 max-w-6xl mx-auto" id="experience">
				<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
					<h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6 text-center">경력</h2>
				</motion.div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{portfolioData.experience.map((exp) => (
						<FlipCard key={exp.id} card={exp} />
					))}
				</div>
			</section>

			{/* 전문 분야 섹션 */}
			<section ref={specialtiesRef} className="py-20 px-4 md:px-10 max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800/50" id="specialties">
				<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
					<h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-6 text-center">전문 분야</h2>
				</motion.div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					{portfolioData.specialties.map((specialty) => (
						<motion.button
							key={specialty.id}
							className={`p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all ${
								selectedSpecialty === specialty.id
									? "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
									: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
							}`}
							onClick={() => handleSpecialtyClick(specialty.id)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<span className="text-4xl mb-3">{specialty.icon}</span>
							<h3 className="text-lg font-semibold">{specialty.name}</h3>
						</motion.button>
					))}
				</div>

				{/* 전문 분야 상세 정보 */}
				<motion.div className="relative overflow-hidden" style={{ height: selectedSpecialty ? "auto" : "0px" }} transition={{ duration: 0.3 }}>
					{selectedSpecialty && portfolioData.specialties.find((s) => s.id === selectedSpecialty) && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.3 }}
							className="p-6 bg-white dark:bg-gray-800 rounded-xl mt-4 shadow-md"
						>
							<h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-3">{portfolioData.specialties.find((s) => s.id === selectedSpecialty)?.name}</h3>
							<p className="text-gray-700 dark:text-gray-300">{portfolioData.specialties.find((s) => s.id === selectedSpecialty)?.description}</p>
						</motion.div>
					)}
				</motion.div>
			</section>
		</div>
	);
}
