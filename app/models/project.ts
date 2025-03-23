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
    description: 'Remix와 Framer Motion을 사용하여 구현한 인터랙티브 포트폴리오 웹사이트',
    thumbnail: '/images/projects/portfolio-thumb.png',
    heroImage: '/images/projects/portfolio-thumb.png',
    category: 'web',
    featured: true,
    date: {
      start: '2025-03-20',
      end: '2025-03-21',
    },
    technologies: [
      {
        name: 'Remix',
        icon: 'remix.svg',
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
      // {
      //   name: 'Three.js',
      //   icon: 'threejs-icon.svg',
      //   color: '#000000',
      //   description: '웹에서 3D 그래픽을 구현하기 위한 JavaScript 라이브러리',
      // },
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
        url: '/images/projects/portfolio-thumb.png',
        alt: '포트폴리오 홈 화면',
        caption: '인터랙티브 요소가 포함된 홈 페이지',
      },
      {
        url: '/images/projects/journal.png',
        alt: '개발 여정',
        caption: '타임라인 형식으로 구현된 개발 여정',
      },
      {
        url: '/images/projects/skills.png',
        alt: '기술 스택 시각화',
        caption: '방사형 네트워크 그래프로 표현된 기술 스택',
      },
    ],
    // videos: [
    //   {
    //     url: '/videos/portfolio-demo.mp4',
    //     thumbnail: '/images/projects/portfolio-video-thumb.jpg',
    //     duration: '1:45',
    //     title: '포트폴리오 사이트 시연 영상',
    //   },
    //   {
    //     url: 'https://example.com',
    //     thumbnail: '/images/projects/website-demo-thumb.jpg',
    //     duration: 'N/A',
    //     title: '라이브 웹사이트 데모',
    //   },
    // ],
    links: [
      {
        url: 'https://github.com/ruehan/interactive_portfolio',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview:
      '이 포트폴리오는 Remix 프레임워크와 Framer Motion을 활용하여 제작된 인터랙티브 웹사이트로, 나의 프로젝트와 기술을 창의적이고 몰입감 있는 방식으로 소개합니다.',
    motivation:
      '기존 정적 포트폴리오를 넘어서 방문자에게 독특하고 기억에 남는 경험을 제공하고, 동시에 웹 개발 역량을 보여주고자 했습니다.',
    goals: [
      '인터랙티브 요소와 애니메이션으로 몰입감 있는 사용자 경험 제공',
      '모든 디바이스에서 최적화된 반응형 디자인 구현',
      '성능과 접근성을 고려한 웹 개발 역량 증명',
    ],
    architecture:
      '이 프로젝트는 Remix 프레임워크를 기반으로 구축되었으며, 서버 사이드 렌더링과 클라이언트 사이드 하이드레이션을 모두 활용합니다. Framer Motion은 페이지 전환 및 요소 애니메이션을 위해 사용되었고, 상태 관리는 React Context API를 통해 구현되었습니다.',
    technical_details: {
      frontend:
        'Remix와 TypeScript를 사용하여 컴포넌트를 개발하고, TailwindCSS로 스타일링했습니다. Framer Motion은 페이지 전환 및 요소 애니메이션에 활용되었습니다.',
      backend:
        'Remix의 loader와 action 함수를 사용하여 서버 사이드 로직을 구현했습니다. 연락 폼은 이메일 발송 서비스와 연동되어 있습니다.',
      database: '프로젝트 데이터는 JSON 파일로 관리되며, 필요 시 외부 CMS로 마이그레이션 가능하도록 설계되었습니다.',
      deployment: 'Vercel을 통해 배포되었으며, CI/CD 파이프라인을 구성하여 자동화된 테스트와 배포를 수행합니다.',
    },
    challenges: [
      {
        title: '접근성과 인터랙티브 요소의 균형',
        description: '시각적으로 화려한 요소가 접근성을 해치지 않도록 하는 것이 중요했습니다.',
        solution:
          '모든 인터랙티브 요소에 키보드 내비게이션 지원과 적절한 ARIA 속성을 추가하고, 접근성 테스트를 통해 검증했습니다.',
      },
      {
        title: '몰입감 있는 애니메이션 구현',
        description: '몰입감 있는 애니메이션을 구현하면서도 접근성을 해치지 않는 것이 어려웠습니다.',
        solution:
          '키보드 내비게이션과 적절한 ARIA 속성을 추가하여 접근성을 유지하면서도 몰입감 있는 애니메이션을 구현했습니다.',
      },
    ],
    outcome:
      '이 프로젝트는 모던 웹 기술을 활용한 시각적으로 매력적이고 기능적인 포트폴리오 웹사이트로 완성되었습니다. 방문자들에게 몰입감 있는 경험을 제공하면서도 내용을 효과적으로 전달합니다.',
    achievements: ['Lighthouse 성능, 접근성, SEO 점수 모두 90점 이상 달성'],
    learnings:
      '이 프로젝트를 통해 웹 개발, 성능 최적화, 그리고 디자인과 기능성의 균형을 맞추는 법을 배웠습니다. 특히 Remix와 Framer Motion의 통합에서 발생하는 복잡성을 해결하는 과정에서 많은 것을 학습했습니다.',
    future_improvements: ['더 복잡한 인터랙션과 애니메이션 추가', '다국어 지원 추가', 'PDF Export 기능 추가'],
    role: '이 프로젝트에서 디자인부터 개발, 배포까지 모든 과정을 단독으로 수행했습니다.',
    team: ['개인 프로젝트'],
  },
  {
    id: '2',
    title: '얼굴인식 기반 출입관리 시스템',
    subtitle: '얼굴인식 기반 출입관리 시스템',
    description: '얼굴인식 기반 출입관리 시스템',
    thumbnail: '/images/projects/doorlock-thumb.jpg',
    category: 'ai',
    featured: false,
    date: {
      start: '2021-07-20',
      end: '2021-09-30',
    },
    images: [
      {
        url: '/images/projects/doorlock-arch.jpeg',
        alt: '시스템 구조',
        caption: '시스템 구조',
      },
    ],
    videos: [
      {
        url: '/videos/doorlock-demo.mp4',
        thumbnail: '/images/projects/doorlock-demo-thumb.jpeg',
        duration: '3:23',
        title: '얼굴인식 기반 출입관리 시스템 시연 영상',
      },
      {
        url: 'https://example.com',
        thumbnail: '/images/projects/website-demo-thumb.jpg',
        duration: 'N/A',
        title: '라이브 웹사이트 데모',
      },
    ],
    technologies: [
      {
        name: 'Python',
        icon: 'python-icon.svg',
        color: '#3572A5',
        description: '얼굴인식 기반 출입관리 시스템',
      },
      {
        name: 'OpenCV',
        icon: 'opencv-icon.svg',
        color: '#339933',
        description: '오픈소스 컴퓨터 비전 라이브러리',
      },
      {
        name: 'Dlib',
        icon: 'dlib-icon.svg',
        color: '#010101',
        description: 'C++ 기반 머신러닝 라이브러리',
      },
      {
        name: 'OpenWeather API',
        icon: 'openweather-icon.svg',
        color: '#000000',
        description: '날씨 데이터 제공 API',
      },
      {
        name: 'Google Cloud Platform',
        icon: 'googlecloud-icon.svg',
        color: '#4285F4',
        description: '저장된 이미지 데이터베이스',
      },
      {
        name: 'Firebase',
        icon: 'firebase-icon.svg',
        color: '#FFCA28',
        description: '실시간 데이터베이스',
      },
    ],
    links: [
      {
        url: '/',
        type: 'demo',
        label: '라이브 데모',
      },
      {
        url: 'https://github.com/ruehan/ai_doorlock',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview: '얼굴인식 기반 출입관리 시스템',
    motivation: '얼굴인식 기술을 익히고 적용하기 위한 프로젝트',
    goals: [
      '얼굴인식 기술을 익히고 적용하기 위한 프로젝트',
      '출입관리 시스템 구현',
      'Jetson Nano를 활용한 실시간 처리 및 도어락 제어',
    ],
    architecture: 'Python과 OpenCV를 사용하여 얼굴인식 기술을 구현',
    technical_details: {
      frontend: 'Tkinter를 사용한 사용자 인터페이스 구현',
      backend: 'OpenCV와 Dlib를 사용한 얼굴인식 기술 구현',
      database: 'Firebase를 사용하여 사용자 정보 저장',
    },
    challenges: [
      {
        title: '얼굴인식 기술의 정확도 향상',
        description: '얼굴인식 기술의 정확도 향상을 위한 연구가 필요했습니다.',
        solution: '서양인의 데이터를 기준으로 되어있는 데이터를 조정하여 얼굴인식 정확도를 높였습니다.',
      },
    ],
    outcome: '얼굴인식 기술을 익히고 적용하기 위한 프로젝트 완성',
    learnings: '얼굴인식 기술을 익히고 적용하기 위한 프로젝트 완성',
    role: 'Jetson Nano를 활용한 실시간 처리 및 도어락 제어, 얼굴인식 기술 적용',
  },
  {
    id: '3',
    title: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘',
    subtitle: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘',
    description: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘',
    thumbnail: '/images/projects/acc-thumb.jpeg',
    category: 'ai',
    featured: false,
    date: {
      start: '2021-10-01',
      end: '2023-03-10',
    },
    images: [
      {
        url: '/images/projects/acc-paper.jpeg',
        alt: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 논문',
        caption: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 논문',
      },
      {
        url: '/images/projects/acc-app.jpeg',
        alt: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 앱',
        caption: '근감소증 진단 앱 (덤벨, 보행 / 악력 / 체중계 / 근육밴드)',
      },
      {
        url: '/images/projects/acc-arch.jpeg',
        alt: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 아키텍처',
        caption: '근감소증 진단 시스템 아키텍처',
      },
      {
        url: '/images/projects/acc-classification.jpeg',
        alt: '가속도 센서 기반 덤벨 동작 측정 알고리즘 분류 알고리즘',
        caption: '가속도 센서 기반 덤벨 동작 측정 알고리즘 분류 알고리즘',
      },
      {
        url: '/images/projects/acc-dumbbell.jpeg',
        alt: '가속도 센서 기반 덤벨 별 동작 특징',
        caption: '가속도 센서 기반 덤벨 별 동작 특징',
      },
    ],
    videos: [
      {
        url: '/videos/acc-demo.mp4',
        thumbnail: '/images/projects/acc-demo-thumb.jpeg',
        duration: '9:32',
        title: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 발표 영상',
      },
      {
        url: 'https://example.com',
        thumbnail: '/images/projects/website-demo-thumb.jpg',
        duration: 'N/A',
        title: '라이브 웹사이트 데모',
      },
    ],
    technologies: [
      {
        name: 'Flask',
        icon: 'flask-icon.svg',
        color: '#61dafb',
        description: '파이썬 웹 프레임워크',
      },
      {
        name: 'Vue.js',
        icon: 'vue-icon.svg',
        color: '#4fc08d',
        description: '자바스크립트 프레임워크',
      },
      {
        name: 'D3.js',
        icon: 'd3-icon.svg',
        color: '#ffca28',
        description: '자바스크립트 데이터 시각화 라이브러리',
      },
      {
        name: 'SQLAlchemy',
        icon: 'sqlalchemy-icon.svg',
        color: '#6772e5',
        description: '파이썬 SQL 라이브러리',
      },
      {
        name: 'Pandas',
        icon: 'pandas-icon.svg',
        color: '#150458',
        description: '파이썬 데이터 분석 라이브러리',
      },
    ],
    links: [],
    overview: '근감소증 진단 및 예방을 위한 시스템 개발',
    motivation: '근감소증 진단 및 예방을 위한 복합적인 시스템 개발 (보행속도 측정, 덤벨 동작 측정)',
    goals: [
      '가속도 센서 기반 보행속도 측정 알고리즘 개발',
      '덤벨 동작 측정 알고리즘 개발',
      '근감소증 진단 시스템 개발',
    ],
    architecture: 'Flask와 Vue.js를 사용한 웹 애플리케이션',
    technical_details: {
      frontend: 'Vue.js를 사용한 프론트엔드',
      backend: 'Flask를 사용한 백엔드',
      database: 'MySQL을 사용한 데이터베이스',
    },
    challenges: [
      {
        title: '가속도 센서만을 이용한 걸음 수 측정 알고리즘 개발',
        description: '가속도 센서만을 이용하여 걸음 수를 측정하는 알고리즘 개발 필요',
        solution:
          '모든 방향에 대한 가속도 센서의 변화량을 공식으로 변환하여 사용자마다의 임계값을 계산하여 해당 임계값을 지날 때마다 걸음 수를 증가시키는 방식으로 걸음 수를 측정',
      },
      {
        title: '사용자의 이동 거리 예측',
        description: 'GPS를 사용하지 않고 가속도 센서만을 이용하여 사용자의 이동 거리를 예측하는 알고리즘 개발',
        solution:
          '보폭 측정 기능을 추가하여 처음 1회에 한하여 일정 거리를 이동하여 보폭을 측정 후 보폭 x 걸음 수로 이동거리를 예측',
      },
      {
        title: '덤벨 동작 측정 알고리즘 개발',
        description: '가속도 센서를 덤벨에 부착하여 덤벨 동작을 측정하는 알고리즘 개발 필요',
        solution:
          '걸음 수 측정과 같은 방식의 공식을 사용하여 덤벨 동작마다의 움직임을 계산하여 특징을 부여 후 덤벨 동작 측정하도록 구현',
      },
    ],
    outcome: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 완성',
    learnings: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 개발 경험을 쌓았습니다.',
    role: '가속도 센서 기반 보행속도 측정 및 덤벨 동작 측정 알고리즘 개발',
  },
  {
    id: '4',
    title: 'Calmiary - 고민 기록 다이어리 🦋',
    subtitle: '고민 기록 다이어리',
    description: '고민 기록 다이어리',
    thumbnail: '/images/projects/calmiary-thumb.png',
    category: 'web',
    featured: false,
    date: {
      start: '2024-10-22',
      end: '2024-11-06',
    },
    images: [
      {
        url: '/images/projects/calmiary-intro.jpeg',
        alt: 'Calmiary 소개',
        caption: 'Calmiary 소개',
      },
      {
        url: '/images/projects/calmiary-arch.png',
        alt: 'Calmiary 아키텍처',
        caption: 'Calmiary 아키텍처',
      },
      {
        url: '/images/projects/calmiary-doc.jpeg',
        alt: 'Calmiary 문서',
        caption: 'Redoc 기반 API 문서',
      },
    ],
    technologies: [
      {
        name: 'React',
        icon: 'react-icon.svg',
        color: '#61dafb',
        description: 'JavaScript 라이브러리',
      },
      {
        name: 'TypeScript',
        icon: 'typescript-icon.svg',
        color: '#007acc',
        description: 'JavaScript의 타입 시스템을 확장한 프로그래밍 언어',
      },
      {
        name: 'Styled Components',
        icon: 'styled-components-icon.svg',
        color: '#DB7093',
        description: 'CSS-in-JS 라이브러리',
      },
      {
        name: 'Framer Motion',
        icon: 'framer-motion-icon.svg',
        color: '#326CE5',
        description: '애니메이션 라이브러리',
      },
      {
        name: 'Python',
        icon: 'python-icon.svg',
        color: '#326CE5',
        description: '파이썬 프로그래밍 언어',
      },
      {
        name: 'FastAPI',
        icon: 'fastapi-icon.svg',
        color: '#47A248',
        description: '파이썬 웹 프레임워크',
      },
      {
        name: 'OpenAI',
        icon: 'openai-icon.svg',
        color: '#003B57',
        description: 'OpenAI API',
      },
      {
        name: 'SQLite',
        icon: 'sqlite-icon.svg',
        color: '#003B57',
        description: 'SQL 데이터베이스',
      },
      {
        name: 'OpenSSL',
        icon: 'openssl-icon.svg',
        color: '#FF4500',
        description: 'SSL/TLS 프로토콜 구현',
      },
    ],
    links: [
      {
        url: 'https://calmiary.org',
        type: 'website',
        label: '웹사이트',
      },
      {
        url: 'https://github.com/prgrms-fe-devcourse/NFE1-1-3-Calmiary',
        type: 'github',
        label: '소스 코드',
      },
    ],
    overview: '고민 기록 다이어리',
    motivation: '몰아치는 고민에 지친 현대인들을 위한 서비스',
    goals: ['고민을 기록하고 공유할 수 있는 서비스', '고민을 해결하는 것을 돕는 서비스'],
    architecture: '고민 기록 다이어리',
    technical_details: {
      frontend: 'React와 TypeScript로 구현된 프론트엔드',
      backend: 'FastAPI와 Python으로 구현된 백엔드',
      deployment: 'Cloudflare Pages를 통한 배포',
      database: 'SQLite를 사용한 데이터베이스',
    },
    challenges: [
      {
        title: '고민을 해결하는 것을 돕는 서비스',
        description: 'OpenAI API를 활용하여 고민을 해결하는 것을 돕는 서비스 구현',
        solution: 'ChatGPT 4o-mini API를 활용하여 고민에 대한 위로와 해결 방법을 제시',
      },
      {
        title: '고민을 기록하고 공유할 수 있는 서비스',
        description: '고민을 기록하고 공유할 수 있는 서비스 구현',
        solution:
          '개인 다이어리에 고민을 저장하고 AI로 해결이 되지 않았을 때 다른 사용자들에게 공유하여 해결 방법을 찾을 수 있도록 구현',
      },
      {
        title: '백엔드 서버 구현',
        description: '프로젝트에서 전체적으로 사용되는 백엔드 서버 구현',
        solution: 'FastAPI를 활용하여 빠르고 안정적인 백엔드 서버 구현 및 문서화',
      },
    ],
    outcome: '고민 기록 다이어리 서비스 완성',
    learnings: 'UI 개발 경험, 백엔드 서버 구현 경험, 프롬프트 기반 AI 고민 해결 기능 개발 경험',
    role: '홈화면, 로그인, 회원가입, 메인 메뉴, 다이어리 페이지 개발 / 전체적인 REST API 개발, 프롬프트 기반 AI 고민 해결 기능 개발',
  },
  {
    id: '5',
    title: 'Contents Lenz - AI 기반 콘텐츠 요약 및 분석 도구',
    subtitle: 'AI 기반 콘텐츠 요약 및 분석 도구',
    description: 'Electron으로 개발한 AI 기반 콘텐츠 요약 및 분석 도구',
    thumbnail: '/images/projects/contents-thumb.jpeg',
    category: 'ai',
    featured: false,
    date: {
      start: '2025-03-10',
      end: '2025-03-13',
    },
    images: [
      {
        url: '/images/projects/contents-main.jpeg',
        alt: 'Contents Lenz 요약 화면',
        caption: 'Contents Lenz 요약 화면',
      },
      {
        url: '/images/projects/contents-lang.jpeg',
        alt: 'Contents Lenz 다양한 언어 지원',
        caption: 'Contents Lenz 다양한 언어 지원',
      },
      {
        url: '/images/projects/contents-api.jpeg',
        alt: 'Contents Lenz API 문서',
        caption: 'Contents Lenz API 문서',
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
        name: 'Python',
        icon: 'python-icon.svg',
        color: '#326CE5',
        description: '파이썬 프로그래밍 언어',
      },
      {
        name: 'FastAPI',
        icon: 'fastapi-icon.svg',
        color: '#47A248',
        description: '파이썬 웹 프레임워크',
      },
      {
        name: 'OpenAI',
        icon: 'openai-icon.svg',
        color: '#003B57',
        description: 'OpenAI API',
      },
      {
        name: 'Jinja2',
        icon: 'jinja2-icon.svg',
        color: '#1572B6',
        description: '파이썬 템플릿 엔진',
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
    overview: 'Windows, Mac, Linux에서 작동하는 AI 기반 콘텐츠 요약 및 분석 도구',
    motivation: '데스크톱 애플리케이션 개발 경험을 쌓고 AI 프롬포트 기반 기술을 배우기 위한 프로젝트',
    goals: ['AI 기반 콘텐츠 요약 및 분석 도구 개발', '다양한 언어 지원', '다양한 문서 포맷 지원'],
    architecture: 'Electron 기반 데스크톱 애플리케이션',
    technical_details: {
      frontend: 'Electron과 Python으로 UI 구현',
      backend: 'FastAPI와 Python으로 백엔드 구현',
      other: 'OpenAI API로 콘텐츠 요약 및 분석',
    },
    challenges: [
      {
        title: '다양한 운영 체제에서 작동하는 데스크톱 애플리케이션 개발',
        description: '여러 운영 체제에서 작동하는 데스크톱 애플리케이션 개발에 대한 어려움',
        solution: 'Electron을 사용하여 다양한 운영 체제에서 작동하는 데스크톱 애플리케이션 개발',
      },
      {
        title: 'AI 토큰 비용 절감',
        description: 'AI 토큰 비용 절감과 콘텐츠 요약 및 분석 정확도 향상을 위한 방법 찾기',
        solution: 'OpenAI API (ChatGPT 4o-mini)를 사용하여 콘텐츠 요약 및 분석',
      },
    ],
    outcome: '여러 운영 체제에서 안정적으로 작동하는 AI 기반 콘텐츠 요약 및 분석 도구 완성',
    learnings: '크로스 플랫폼 데스크톱 애플리케이션 개발과 AI 프롬포트 기반 기술에 대한 지식을 얻었습니다.',
    role: '데스크톱 애플리케이션 개발',
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
