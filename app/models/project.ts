export interface Technology {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjectVideo {
  url: string;
  thumbnail: string;
  duration: string;
  title: string;
}

export interface ProjectLink {
  url: string;
  type: 'github' | 'demo' | 'website' | 'article' | 'other';
  label: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
  solution: string;
}

export type ProjectCategory = 'web' | 'mobile' | 'backend' | 'fullstack' | 'design' | 'ai' | 'game' | 'other';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  heroImage?: string;
  category: ProjectCategory;
  featured: boolean;
  date: {
    start: string;
    end: string | 'present';
  };
  technologies: Technology[];
  images: ProjectImage[];
  videos?: ProjectVideo[];
  links: ProjectLink[];

  // 체계적 프로젝트 정보
  overview: string;
  motivation: string;
  goals: string[];

  // 기술적 상세
  architecture: string;
  technical_details: {
    frontend?: string;
    backend?: string;
    database?: string;
    deployment?: string;
    other?: string;
  };

  // 과제와 해결책
  challenges: ProjectChallenge[];

  // 결과 및 성과
  outcome: string;
  achievements?: string[];
  metrics?: {
    [key: string]: string | number;
  };

  // 회고 및 학습
  learnings: string;
  future_improvements?: string[];

  // 역할
  role: string;
  team?: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: '인터랙티브 포트폴리오',
    subtitle: '개인 웹 포트폴리오 프로젝트',
    description: 'Remix와 Three.js로 구현한 인터랙티브 포트폴리오 웹사이트',
    thumbnail: '/images/projects/portfolio-thumb.jpg',
    heroImage: '/images/projects/portfolio-hero.jpg',
    category: 'web',
    featured: true,
    date: {
      start: '2023-11-15',
      end: '2023-12-01',
    },
    technologies: [
      {
        name: 'Remix',
        icon: 'remix-icon.svg',
        color: '#7928ca',
        description: '서버-클라이언트 렌더링을 위한 React 프레임워크',
      },
      {
        name: 'React',
        icon: 'react-icon.svg',
        color: '#61dafb',
        description: '사용자 인터페이스 구축을 위한 JavaScript 라이브러리',
      },
      {
        name: 'TypeScript',
        icon: 'typescript-icon.svg',
        color: '#3178c6',
        description: '정적 타입을 지원하는 JavaScript 상위 집합',
      },
      {
        name: 'Three.js',
        icon: 'threejs-icon.svg',
        color: '#000000',
        description: '웹에서 3D 그래픽을 구현하기 위한 JavaScript 라이브러리',
      },
      {
        name: 'TailwindCSS',
        icon: 'tailwind-icon.svg',
        color: '#38b2ac',
        description: '유틸리티 우선 CSS 프레임워크',
      },
      {
        name: 'Framer Motion',
        icon: 'framer-icon.svg',
        color: '#0055ff',
        description: 'React 애니메이션 라이브러리',
      },
    ],
    images: [
      {
        url: '/images/projects/portfolio-1.jpg',
        alt: '포트폴리오 홈 화면',
        caption: '인터랙티브 요소가 포함된 홈 페이지',
      },
      {
        url: '/images/projects/portfolio-2.jpg',
        alt: '프로젝트 갤러리',
        caption: '3D 회전 큐브로 구현된 프로젝트 갤러리',
      },
      {
        url: '/images/projects/portfolio-3.jpg',
        alt: '기술 스택 시각화',
        caption: '방사형 네트워크 그래프로 표현된 기술 스택',
      },
    ],
    videos: [
      {
        url: '/videos/portfolio-demo.mp4',
        thumbnail: '/images/projects/portfolio-video-thumb.jpg',
        duration: '1:45',
        title: '포트폴리오 사이트 시연 영상',
      },
    ],
    links: [
      {
        url: 'https://portfolio.example.com',
        type: 'demo',
        label: '라이브 데모',
      },
      {
        url: 'https://github.com/username/portfolio',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview:
      '이 포트폴리오는 Remix 프레임워크와 Three.js를 활용하여 제작된 인터랙티브 웹사이트로, 나의 프로젝트와 기술을 창의적이고 몰입감 있는 방식으로 소개합니다.',
    motivation:
      '기존 정적 포트폴리오를 넘어서 방문자에게 독특하고 기억에 남는 경험을 제공하고, 동시에 웹 개발 역량을 보여주고자 했습니다.',
    goals: [
      '인터랙티브 요소와 애니메이션으로 몰입감 있는 사용자 경험 제공',
      '모든 디바이스에서 최적화된 반응형 디자인 구현',
      '성능과 접근성을 고려한 웹 개발 역량 증명',
      'Three.js를 활용한 3D 요소 통합',
    ],
    architecture:
      '이 프로젝트는 Remix 프레임워크를 기반으로 구축되었으며, 서버 사이드 렌더링과 클라이언트 사이드 하이드레이션을 모두 활용합니다. Three.js는 3D 요소와 애니메이션을 위해 사용되었고, 상태 관리는 React Context API를 통해 구현되었습니다.',
    technical_details: {
      frontend:
        'React와 TypeScript를 사용하여 컴포넌트를 개발하고, TailwindCSS로 스타일링했습니다. Framer Motion은 페이지 전환 및 요소 애니메이션에 활용되었습니다.',
      backend:
        'Remix의 loader와 action 함수를 사용하여 서버 사이드 로직을 구현했습니다. 연락 폼은 이메일 발송 서비스와 연동되어 있습니다.',
      database: '프로젝트 데이터는 JSON 파일로 관리되며, 필요 시 외부 CMS로 마이그레이션 가능하도록 설계되었습니다.',
      deployment: 'Vercel을 통해 배포되었으며, CI/CD 파이프라인을 구성하여 자동화된 테스트와 배포를 수행합니다.',
    },
    challenges: [
      {
        title: '3D 요소의 성능 최적화',
        description: '3D 요소는 저사양 디바이스에서 성능 이슈를 발생시킬 수 있었습니다.',
        solution:
          '디바이스 성능에 따라 3D 효과의 복잡도를 자동으로 조절하는 기능을 구현하고, 모델 최적화 및 지연 로딩을 적용했습니다.',
      },
      {
        title: '반응형 디자인에서의 3D 요소 조정',
        description: '다양한 화면 크기에서 3D 요소의 크기와 위치를 적절히 조정하는 것이 도전적이었습니다.',
        solution: '화면 크기에 따라 3D 요소의 스케일과 위치를 동적으로 계산하는 유틸리티 함수를 개발하여 적용했습니다.',
      },
      {
        title: '접근성과 인터랙티브 요소의 균형',
        description: '시각적으로 화려한 요소가 접근성을 해치지 않도록 하는 것이 중요했습니다.',
        solution:
          '모든 인터랙티브 요소에 키보드 내비게이션 지원과 적절한 ARIA 속성을 추가하고, 접근성 테스트를 통해 검증했습니다.',
      },
    ],
    outcome:
      '이 프로젝트는 모던 웹 기술을 활용한 시각적으로 매력적이고 기능적인 포트폴리오 웹사이트로 완성되었습니다. 방문자들에게 몰입감 있는 경험을 제공하면서도 내용을 효과적으로 전달합니다.',
    achievements: [
      'Lighthouse 성능, 접근성, SEO 점수 모두 90점 이상 달성',
      'CSS Design Awards에 후보로 선정',
      '주간 방문자 수 증가로 인한 취업 문의 증가',
    ],
    learnings:
      '이 프로젝트를 통해 3D 웹 개발, 성능 최적화, 그리고 디자인과 기능성의 균형을 맞추는 법을 배웠습니다. 특히 Remix와 Three.js의 통합에서 발생하는 복잡성을 해결하는 과정에서 많은 것을 학습했습니다.',
    future_improvements: [
      '더 복잡한 3D 인터랙션과 애니메이션 추가',
      '블로그 섹션 통합',
      '다국어 지원 추가',
      '방문자 분석 대시보드 구현',
    ],
    role: '이 프로젝트에서 디자인부터 개발, 배포까지 모든 과정을 단독으로 수행했습니다.',
    team: ['개인 프로젝트'],
  },
  {
    id: '2',
    title: '실시간 채팅 앱',
    subtitle: '실시간 소통 채팅 앱',
    description: 'Socket.io와 React를 이용한 실시간 채팅 애플리케이션',
    thumbnail: '/images/projects/chat-thumb.jpg',
    category: 'web',
    featured: false,
    date: {
      start: '2023-09-01',
      end: '2023-09-15',
    },
    images: [
      {
        url: '/images/projects/chat-1.jpg',
        alt: '채팅 앱 메인 화면',
      },
      {
        url: '/images/projects/chat-2.jpg',
        alt: '채팅 룸 화면',
      },
    ],
    technologies: [
      {
        name: 'React',
        icon: 'react-icon.svg',
        color: '#61dafb',
        description: '사용자 인터페이스 구축을 위한 JavaScript 라이브러리',
      },
      {
        name: 'Node.js',
        icon: 'nodejs-icon.svg',
        color: '#339933',
        description: '서버 사이드 JavaScript 런타임',
      },
      {
        name: 'Socket.io',
        icon: 'socketio-icon.svg',
        color: '#010101',
        description: '실시간 양방향 이벤트 기반 통신',
      },
      {
        name: 'Express',
        icon: 'express-icon.svg',
        color: '#000000',
        description: 'Node.js를 위한 웹 애플리케이션 프레임워크',
      },
      {
        name: 'MongoDB',
        icon: 'mongodb-icon.svg',
        color: '#47A248',
        description: 'NoSQL 문서 지향 데이터베이스',
      },
      {
        name: 'TailwindCSS',
        icon: 'tailwind-icon.svg',
        color: '#38b2ac',
        description: '유틸리티 우선 CSS 프레임워크',
      },
    ],
    links: [
      {
        url: 'https://chat.example.com',
        type: 'demo',
        label: '라이브 데모',
      },
      {
        url: 'https://github.com/username/chat-app',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview: '실시간 통신이 가능한 채팅 애플리케이션',
    motivation: '실시간 통신 기술을 익히고 적용하기 위한 프로젝트',
    goals: ['Socket.io를 활용한 실시간 통신 구현', '사용자 인증 및 권한 관리', '채팅방 생성 및 관리 기능 구현'],
    architecture: 'React 기반 프론트엔드와 Express 서버를 Socket.io로 연결하여 실시간 데이터 통신을 구현',
    technical_details: {
      frontend: 'React와 TailwindCSS를 활용해 UI 구현',
      backend: 'Express와 Socket.io를 사용한 실시간 서버',
      database: 'MongoDB를 사용하여 사용자 정보와 채팅 내역 저장',
    },
    challenges: [
      {
        title: '실시간 사용자 상태 관리',
        description: '다수의 사용자가 동시에 접속할 때 상태 관리의 어려움이 있었습니다.',
        solution: 'Redis를 활용한 pub/sub 패턴으로 상태 관리 최적화',
      },
    ],
    outcome: '안정적인 실시간 통신이 가능한 채팅 애플리케이션 완성',
    learnings: '실시간 데이터 처리와 상태 관리에 대한 깊은 이해를 얻었습니다.',
    role: '풀스택 개발자로서 전체 기능 구현',
  },
  {
    id: '3',
    title: '전자상거래 모바일 앱',
    subtitle: '크로스 플랫폼 쇼핑 앱',
    description: 'React Native로 개발한 크로스 플랫폼 전자상거래 앱',
    thumbnail: '/images/projects/ecommerce-thumb.jpg',
    category: 'mobile',
    featured: false,
    date: {
      start: '2023-05-01',
      end: '2023-06-10',
    },
    images: [
      {
        url: '/images/projects/ecommerce-1.jpg',
        alt: '전자상거래 앱 메인 화면',
      },
      {
        url: '/images/projects/ecommerce-2.jpg',
        alt: '상품 상세 화면',
      },
      {
        url: '/images/projects/ecommerce-3.jpg',
        alt: '장바구니 화면',
      },
    ],
    technologies: [
      {
        name: 'React Native',
        icon: 'react-native-icon.svg',
        color: '#61dafb',
        description: '크로스 플랫폼 모바일 앱 개발 프레임워크',
      },
      {
        name: 'Redux',
        icon: 'redux-icon.svg',
        color: '#764abc',
        description: '상태 관리 라이브러리',
      },
      {
        name: 'Firebase',
        icon: 'firebase-icon.svg',
        color: '#ffca28',
        description: '앱 개발 및 서버리스 백엔드 플랫폼',
      },
      {
        name: 'Stripe API',
        icon: 'stripe-icon.svg',
        color: '#6772e5',
        description: '온라인 결제 처리 API',
      },
      {
        name: 'JavaScript',
        icon: 'javascript-icon.svg',
        color: '#f7df1e',
        description: '웹 및 앱 개발을 위한 프로그래밍 언어',
      },
    ],
    links: [
      {
        url: 'https://play.google.com/store/example',
        type: 'demo',
        label: '플레이 스토어',
      },
      {
        url: 'https://github.com/username/ecommerce-app',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview: 'iOS와 Android에서 모두 작동하는 전자상거래 모바일 앱',
    motivation: '단일 코드베이스로 크로스 플랫폼 앱 개발 경험을 쌓기 위한 프로젝트',
    goals: ['직관적인 사용자 인터페이스 구현', '안전한 결제 시스템 연동', '상품 검색 및 필터링 기능 제공'],
    architecture: 'React Native로 구현된 프론트엔드와 Firebase를 활용한 서버리스 백엔드',
    technical_details: {
      frontend: 'React Native와 Redux를 사용한 상태 관리',
      backend: 'Firebase Authentication, Firestore, Cloud Functions 활용',
      database: 'Firestore를 사용하여 상품 및 사용자 정보 관리',
    },
    challenges: [
      {
        title: '플랫폼별 UI 차이 해결',
        description: 'iOS와 Android에서의 UI 표현 차이로 인한 개발 복잡성 증가',
        solution: '플랫폼별 조건부 스타일링과 컴포넌트 분리를 통한 최적화',
      },
    ],
    outcome: 'iOS와 Android 모두에서 원활하게 작동하는 전자상거래 앱 완성',
    learnings: '크로스 플랫폼 개발의 장단점과 최적화 전략에 대해 배웠습니다.',
    role: '모바일 앱 개발자로서 전체 앱 설계 및 개발',
  },
  {
    id: '4',
    title: 'API 게이트웨이',
    subtitle: '마이크로서비스 API 관리 시스템',
    description: 'Node.js와 Express로 구현된 마이크로서비스 API 게이트웨이',
    thumbnail: '/images/projects/gateway-thumb.jpg',
    category: 'backend',
    featured: false,
    date: {
      start: '2023-02-15',
      end: '2023-03-22',
    },
    images: [
      {
        url: '/images/projects/gateway-1.jpg',
        alt: 'API 게이트웨이 아키텍처 다이어그램',
      },
      {
        url: '/images/projects/gateway-2.jpg',
        alt: '모니터링 대시보드',
      },
    ],
    technologies: [
      {
        name: 'Node.js',
        icon: 'nodejs-icon.svg',
        color: '#339933',
        description: '서버 사이드 JavaScript 런타임',
      },
      {
        name: 'Express',
        icon: 'express-icon.svg',
        color: '#000000',
        description: 'Node.js를 위한 웹 애플리케이션 프레임워크',
      },
      {
        name: 'Docker',
        icon: 'docker-icon.svg',
        color: '#2496ED',
        description: '애플리케이션 컨테이너화 플랫폼',
      },
      {
        name: 'Kubernetes',
        icon: 'kubernetes-icon.svg',
        color: '#326CE5',
        description: '컨테이너 오케스트레이션 플랫폼',
      },
      {
        name: 'Redis',
        icon: 'redis-icon.svg',
        color: '#DC382D',
        description: '인메모리 데이터 구조 저장소',
      },
      {
        name: 'MongoDB',
        icon: 'mongodb-icon.svg',
        color: '#47A248',
        description: 'NoSQL 문서 지향 데이터베이스',
      },
    ],
    links: [
      {
        url: 'https://github.com/username/api-gateway',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview: '분산 마이크로서비스 아키텍처를 위한 API 게이트웨이',
    motivation: '마이크로서비스 아키텍처의 복잡성을 관리하는 방법을 배우기 위한 프로젝트',
    goals: ['중앙화된 API 요청 라우팅', '인증 및 권한 관리', '속도 제한 및 캐싱 구현', '로깅 및 모니터링'],
    architecture: 'Express 기반 게이트웨이와 Docker 컨테이너화된 마이크로서비스로 구성',
    technical_details: {
      backend: 'Express와 Node.js로 구현된 메인 게이트웨이',
      deployment: 'Kubernetes를 통한 컨테이너 오케스트레이션',
      database: 'Redis를 사용한 캐싱 및 속도 제한, MongoDB를 사용한 로깅',
    },
    challenges: [
      {
        title: '부하 분산 및 고가용성 확보',
        description: '트래픽 증가에 따른 확장성과 가용성 문제',
        solution: 'Kubernetes의 수평적 오토스케일링과 로드 밸런싱을 통한 분산 처리',
      },
    ],
    outcome: '고성능, 확장 가능한 API 게이트웨이 시스템 구축',
    learnings: '마이크로서비스 아키텍처의 설계 패턴과 관리 전략에 대해 배웠습니다.',
    role: '백엔드 개발자로서 게이트웨이 설계 및 개발',
  },
  {
    id: '5',
    title: '데스크톱 미디어 플레이어',
    subtitle: '크로스 플랫폼 미디어 재생 애플리케이션',
    description: 'Electron으로 개발한 크로스 플랫폼 미디어 플레이어',
    thumbnail: '/images/projects/player-thumb.jpg',
    category: 'other',
    featured: false,
    date: {
      start: '2022-10-01',
      end: '2022-11-05',
    },
    images: [
      {
        url: '/images/projects/player-1.jpg',
        alt: '미디어 플레이어 메인 화면',
      },
      {
        url: '/images/projects/player-2.jpg',
        alt: '비디오 재생 화면',
      },
      {
        url: '/images/projects/player-3.jpg',
        alt: '재생 목록 관리 화면',
      },
    ],
    technologies: [
      {
        name: 'Electron',
        icon: 'electron-icon.svg',
        color: '#47848F',
        description: '크로스 플랫폼 데스크톱 앱 개발 프레임워크',
      },
      {
        name: 'React',
        icon: 'react-icon.svg',
        color: '#61dafb',
        description: '사용자 인터페이스 구축을 위한 JavaScript 라이브러리',
      },
      {
        name: 'JavaScript',
        icon: 'javascript-icon.svg',
        color: '#f7df1e',
        description: '웹 및 앱 개발을 위한 프로그래밍 언어',
      },
      {
        name: 'HTML5',
        icon: 'html5-icon.svg',
        color: '#E34F26',
        description: '웹 페이지 구조를 정의하는 마크업 언어',
      },
      {
        name: 'CSS3',
        icon: 'css3-icon.svg',
        color: '#1572B6',
        description: '웹 페이지 스타일을 정의하는 스타일 시트 언어',
      },
      {
        name: 'WebRTC',
        icon: 'webrtc-icon.svg',
        color: '#333333',
        description: '실시간 커뮤니케이션을 위한 웹 API',
      },
    ],
    links: [
      {
        url: 'https://player.example.com',
        type: 'demo',
        label: '다운로드',
      },
      {
        url: 'https://github.com/username/media-player',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview: 'Windows, Mac, Linux에서 작동하는 데스크톱 미디어 플레이어',
    motivation: '데스크톱 애플리케이션 개발 경험을 쌓고 미디어 재생 기술을 배우기 위한 프로젝트',
    goals: ['다양한 미디어 포맷 지원', '직관적인 사용자 인터페이스', '재생 목록 관리 기능'],
    architecture: 'Electron 기반 데스크톱 애플리케이션으로, React로 UI를 구성하고 HTML5 미디어 API를 활용',
    technical_details: {
      frontend: 'React와 CSS3로 UI 구현',
      other: 'HTML5 Media API와 WebRTC를 사용한 미디어 처리',
    },
    challenges: [
      {
        title: '다양한 미디어 코덱 지원',
        description: '여러 포맷의 미디어 파일 지원에 대한 어려움',
        solution: 'FFmpeg 통합을 통한 코덱 변환 및 지원 확장',
      },
    ],
    outcome: '여러 운영 체제에서 안정적으로 작동하는 미디어 플레이어 완성',
    learnings: '크로스 플랫폼 데스크톱 애플리케이션 개발과 미디어 처리에 대한 지식을 얻었습니다.',
    role: '데스크톱 애플리케이션 개발자',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByType(type: string): Project[] {
  if (type === 'all') return projects;
  return projects.filter(project => project.category === type);
}

export function getProjectsByCategory(category: ProjectCategory | 'all'): Project[] {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
}

export function getProjectsByTechnology(techName: string): Project[] {
  return projects.filter(project => project.technologies.some(tech => tech.name === techName));
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getAllTechnologies(): Technology[] {
  const techMap = new Map<string, Technology>();

  projects.forEach(project => {
    project.technologies.forEach(tech => {
      if (!techMap.has(tech.name)) {
        techMap.set(tech.name, tech);
      }
    });
  });

  return Array.from(techMap.values()).sort((a, b) => {
    if (!a || !a.name) return -1;
    if (!b || !b.name) return 1;
    return a.name.localeCompare(b.name);
  });
}

export function getAllCategories(): ProjectCategory[] {
  const categories = new Set<ProjectCategory>();

  projects.forEach(project => {
    categories.add(project.category);
  });

  return Array.from(categories);
}

export function getAllProjectTypes(): string[] {
  const types = new Set<string>();

  projects.forEach(project => {
    types.add(project.category);
  });

  return Array.from(types);
}
