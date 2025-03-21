export interface Project {
	id: string;
	title: string;
	description: string;
	fullDescription: string;
	thumbnail: string;
	images: string[];
	technologies: string[];
	type: "web" | "mobile" | "desktop" | "backend";
	demoUrl?: string;
	sourceUrl?: string;
	date: string;
}

// 목 데이터
export const projects: Project[] = [
	{
		id: "1",
		title: "인터랙티브 포트폴리오",
		description: "Remix와 Three.js로 구현한 인터랙티브 포트폴리오 웹사이트",
		fullDescription:
			"이 포트폴리오는 Remix 프레임워크와 Three.js를 활용하여 제작되었으며, 반응형 디자인과 인터랙티브한 3D 요소를 통해 방문자에게 몰입감 있는 경험을 제공합니다. 사이트는 다크 모드를 지원하며, 애니메이션과 트랜지션 효과로 모던한 느낌을 줍니다.",
		thumbnail: "/images/projects/portfolio-thumb.jpg",
		images: ["/images/projects/portfolio-1.jpg", "/images/projects/portfolio-2.jpg", "/images/projects/portfolio-3.jpg"],
		technologies: ["Remix", "React", "TypeScript", "Three.js", "TailwindCSS", "Framer Motion"],
		type: "web",
		demoUrl: "https://portfolio.example.com",
		sourceUrl: "https://github.com/username/portfolio",
		date: "2023-12-01",
	},
	{
		id: "2",
		title: "실시간 채팅 앱",
		description: "Socket.io와 React를 이용한 실시간 채팅 애플리케이션",
		fullDescription:
			"이 실시간 채팅 앱은 Socket.io를 사용하여 사용자 간의 즉각적인 메시지 전송을 구현했습니다. 사용자는 개인 메시지를 보내거나 그룹 채팅에 참여할 수 있으며, 이미지와 파일을 공유할 수도 있습니다. 백엔드는 Node.js와 Express로 구축되었고, 프론트엔드는 React와 TypeScript로 개발되었습니다.",
		thumbnail: "/images/projects/chat-thumb.jpg",
		images: ["/images/projects/chat-1.jpg", "/images/projects/chat-2.jpg"],
		technologies: ["React", "Node.js", "Socket.io", "Express", "MongoDB", "TailwindCSS"],
		type: "web",
		demoUrl: "https://chat.example.com",
		sourceUrl: "https://github.com/username/chat-app",
		date: "2023-09-15",
	},
	{
		id: "3",
		title: "전자상거래 모바일 앱",
		description: "React Native로 개발한 크로스 플랫폼 전자상거래 앱",
		fullDescription:
			"이 모바일 앱은 React Native를 사용하여 iOS와 Android 플랫폼 모두에서 동작하는 전자상거래 솔루션을 제공합니다. 사용자는 제품을 검색하고, 장바구니에 추가하며, 결제 프로세스를 완료할 수 있습니다. 앱은 Redux를 사용하여 상태를 관리하고, Firebase를 통해 사용자 인증 및 데이터베이스 기능을 구현했습니다.",
		thumbnail: "/images/projects/ecommerce-thumb.jpg",
		images: ["/images/projects/ecommerce-1.jpg", "/images/projects/ecommerce-2.jpg", "/images/projects/ecommerce-3.jpg"],
		technologies: ["React Native", "Redux", "Firebase", "Stripe API", "JavaScript"],
		type: "mobile",
		demoUrl: "https://play.google.com/store/example",
		sourceUrl: "https://github.com/username/ecommerce-app",
		date: "2023-06-10",
	},
	{
		id: "4",
		title: "API 게이트웨이",
		description: "Node.js와 Express로 구현된 마이크로서비스 API 게이트웨이",
		fullDescription:
			"이 API 게이트웨이는 마이크로서비스 아키텍처의 중심에서 클라이언트 요청을 적절한 서비스로 라우팅하고, 응답을 관리합니다. 인증, 로깅, 속도 제한, 캐싱과 같은 공통 기능을 처리하며, Docker와 Kubernetes를 사용하여 컨테이너화 및 오케스트레이션을 구현했습니다.",
		thumbnail: "/images/projects/gateway-thumb.jpg",
		images: ["/images/projects/gateway-1.jpg", "/images/projects/gateway-2.jpg"],
		technologies: ["Node.js", "Express", "Docker", "Kubernetes", "Redis", "MongoDB"],
		type: "backend",
		sourceUrl: "https://github.com/username/api-gateway",
		date: "2023-03-22",
	},
	{
		id: "5",
		title: "데스크톱 미디어 플레이어",
		description: "Electron으로 개발한 크로스 플랫폼 미디어 플레이어",
		fullDescription:
			"이 데스크톱 미디어 플레이어는 Electron 프레임워크를 사용하여 Windows, macOS, Linux 시스템에서 실행됩니다. 사용자는 로컬 미디어 파일을 재생하거나 온라인 스트리밍 서비스에 연결할 수 있습니다. 플레이어는 사용자 정의 테마, 플레이리스트 관리, 오디오 이퀄라이저 등의 기능을 제공합니다.",
		thumbnail: "/images/projects/player-thumb.jpg",
		images: ["/images/projects/player-1.jpg", "/images/projects/player-2.jpg", "/images/projects/player-3.jpg"],
		technologies: ["Electron", "React", "JavaScript", "HTML5", "CSS3", "WebRTC"],
		type: "desktop",
		demoUrl: "https://player.example.com",
		sourceUrl: "https://github.com/username/media-player",
		date: "2022-11-05",
	},
];

// 프로젝트 ID로 프로젝트 찾기
export function getProjectById(id: string): Project | undefined {
	return projects.find((project) => project.id === id);
}

// 프로젝트 타입별로 필터링
export function getProjectsByType(type: string): Project[] {
	if (type === "all") return projects;
	return projects.filter((project) => project.type === type);
}

// 기술별로 프로젝트 필터링
export function getProjectsByTechnology(tech: string): Project[] {
	return projects.filter((project) => project.technologies.includes(tech));
}

// 모든 기술 목록 가져오기
export function getAllTechnologies(): string[] {
	const techSet = new Set<string>();
	projects.forEach((project) => {
		project.technologies.forEach((tech) => techSet.add(tech));
	});
	return Array.from(techSet).sort();
}

// 모든 프로젝트 타입 가져오기
export function getAllProjectTypes(): string[] {
	const typeSet = new Set<string>();
	projects.forEach((project) => {
		typeSet.add(project.type);
	});
	return Array.from(typeSet);
}
