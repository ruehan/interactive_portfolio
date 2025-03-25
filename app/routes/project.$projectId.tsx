import { useState } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import { getProjectById } from '~/models/project';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaPlay } from 'react-icons/fa';
import VideoModal from '~/components/VideoModal';
import ImageModal from '~/components/ImageModal';
import type { ProjectVideo } from '~/models/project';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data || !data.project) {
    return [
      { title: '프로젝트를 찾을 수 없음 | 한규 포트폴리오' },
      { name: 'description', content: '요청하신 프로젝트를 찾을 수 없습니다.' },
    ];
  }

  return [
    { title: `${data.project.title} | 한규 포트폴리오` },
    { name: 'description', content: data.project.description },
    { property: 'og:title', content: data.project.title },
    { property: 'og:description', content: data.project.description },
    { property: 'og:image', content: data.project.thumbnail },
    { property: 'og:type', content: 'article' },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const projectId = params.projectId;

  if (!projectId) {
    throw new Response('프로젝트 ID가 필요합니다', { status: 400 });
  }

  const project = getProjectById(projectId);

  if (!project) {
    throw new Response('프로젝트를 찾을 수 없습니다', { status: 404 });
  }

  return json({ project });
}

export function ErrorBoundary() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">프로젝트를 찾을 수 없습니다</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        요청하신 프로젝트가 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/projects"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          모든 프로젝트 보기
        </Link>
        <Link
          to="/"
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { project } = useLoaderData<typeof loader>();
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'challenges' | 'outcome'>('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<ProjectVideo | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // 현재 선택된 이미지를 모달에 표시하는 함수
  const openImageModal = () => {
    if (project.images.length > 0 && project.images[currentImageIndex]) {
      setIsImageModalOpen(true);
    }
  };

  // 이미지 인덱스 변경 함수
  const changeImageIndex = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 헤더 섹션 */}
      <div
        className="h-80 md:h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${project.heroImage || project.thumbnail})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="container mx-auto px-6">
            <Link to="/projects" className="text-white hover:text-blue-400 flex items-center mb-8">
              <FaArrowLeft className="mr-2" /> 모든 프로젝트
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            <p className="text-xl md:text-2xl mt-2 text-blue-400">{project.subtitle}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: tech.color + '33', color: tech.color }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 프로젝트 콘텐츠 */}
      <div className="container mx-auto px-6 py-12">
        {/* 프로젝트 정보 탭 */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            개요
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'technical' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('technical')}
          >
            기술 상세
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'challenges' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('challenges')}
          >
            도전 과제
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'outcome' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('outcome')}
          >
            결과
          </button>
        </div>

        {/* 프로젝트 이미지 갤러리 */}
        <div className="mb-10">
          <div className="relative overflow-hidden rounded-lg h-64 md:h-96 mb-4">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full cursor-pointer"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: index === currentImageIndex ? 1 : 0,
                  x: index === currentImageIndex ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
                onClick={openImageModal}
              >
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 text-sm">
                    {image.caption}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {project.images.map((image, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-600'}`}
                onClick={() => changeImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* 외부 링크 */}
        <div className="flex flex-wrap gap-4 mb-10">
          {/* 비디오가 있는 경우 */}
          {project.videos && project.videos.length > 0 && (
            <button
              onClick={() => {
                setSelectedVideo(project.videos![0]);
                setIsVideoModalOpen(true);
              }}
              className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlay className="mr-2" /> 데모 영상 보기
            </button>
          )}
          {/* 비디오는 없지만 데모 링크가 있는 경우 */}
          {(!project.videos || project.videos.length === 0) && project.links.some(link => link.type === 'demo') && (
            <button
              onClick={() => {
                const demoUrl = project.links.find(link => link.type === 'demo')?.url || '';
                const dummyVideo: ProjectVideo = {
                  url: demoUrl,
                  thumbnail: project.thumbnail,
                  duration: 'N/A',
                  title: `${project.title} 데모`,
                };
                setSelectedVideo(dummyVideo);
                setIsVideoModalOpen(true);
              }}
              className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlay className="mr-2" /> 데모 보기
            </button>
          )}
          {/* GitHub 링크 */}
          {project.links.some(link => link.type === 'github') && (
            <a
              href={project.links.find(link => link.type === 'github')?.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
            >
              <FaGithub className="mr-2" /> 소스 코드
            </a>
          )}
          {/* 기타 링크 (데모, GitHub 제외) */}
          {project.links
            .filter(link => link.type !== 'demo' && link.type !== 'github')
            .map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FaExternalLinkAlt className="mr-2" /> {link.label}
              </a>
            ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div className="bg-slate-800 rounded-lg p-6">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">프로젝트 개요</h2>
              <p className="mb-6 text-gray-300">{project.overview}</p>

              <h3 className="text-xl font-bold mb-3">개발 동기</h3>
              <p className="mb-6 text-gray-300">{project.motivation}</p>

              <h3 className="text-xl font-bold mb-3">프로젝트 목표</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
                {project.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>

              <h3 className="text-xl font-bold mb-3">담당 역할</h3>
              <p className="text-gray-300">{project.role}</p>

              {project.team && project.team.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mt-6 mb-3">팀 구성</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {project.team.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'technical' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">기술 상세</h2>

              <h3 className="text-xl font-bold mb-3">아키텍처</h3>
              <p className="mb-6 text-gray-300">{project.architecture}</p>

              {project.technical_details.frontend && (
                <>
                  <h3 className="text-xl font-bold mb-3">프론트엔드</h3>
                  <p className="mb-6 text-gray-300">{project.technical_details.frontend}</p>
                </>
              )}

              {project.technical_details.backend && (
                <>
                  <h3 className="text-xl font-bold mb-3">백엔드</h3>
                  <p className="mb-6 text-gray-300">{project.technical_details.backend}</p>
                </>
              )}

              {project.technical_details.database && (
                <>
                  <h3 className="text-xl font-bold mb-3">데이터베이스</h3>
                  <p className="mb-6 text-gray-300">{project.technical_details.database}</p>
                </>
              )}

              {project.technical_details.deployment && (
                <>
                  <h3 className="text-xl font-bold mb-3">배포</h3>
                  <p className="mb-6 text-gray-300">{project.technical_details.deployment}</p>
                </>
              )}

              {project.technical_details.other && (
                <>
                  <h3 className="text-xl font-bold mb-3">기타 기술</h3>
                  <p className="mb-6 text-gray-300">{project.technical_details.other}</p>
                </>
              )}

              <h3 className="text-xl font-bold mb-3">사용 기술</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 mr-3 flex items-center justify-center">
                        <img src={`/images/tech/${tech.icon}`} alt={tech.name} className="max-w-full max-h-full" />
                      </div>
                      <h4 className="font-bold" style={{ color: tech.color }}>
                        {tech.name}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-300">{tech.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'challenges' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-6">도전 과제 및 해결책</h2>

              <div className="space-y-8">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
                    <div className="mb-4">
                      <h4 className="font-bold text-red-400 mb-2">문제</h4>
                      <p className="text-gray-300">{challenge.description}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400 mb-2">해결책</h4>
                      <p className="text-gray-300">{challenge.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'outcome' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl font-bold mb-4">결과 및 성과</h2>
              <p className="mb-6 text-gray-300">{project.outcome}</p>

              {project.achievements && project.achievements.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-3">주요 성과</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
                    {project.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.metrics && Object.keys(project.metrics).length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-3">주요 지표</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(project.metrics).map(([key, value], index) => (
                      <div key={index} className="bg-slate-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{value}</div>
                        <div className="text-sm text-gray-300">{key}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className="text-xl font-bold mb-3">배운 점</h3>
              <p className="mb-6 text-gray-300">{project.learnings}</p>

              {project.future_improvements && project.future_improvements.length > 0 && (
                <>
                  <h3 className="text-xl font-bold mb-3">향후 개선 사항</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {project.future_improvements.map((improvement, index) => (
                      <li key={index}>{improvement}</li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* 비디오 모달 */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} video={selectedVideo} />

      {/* 이미지 모달 */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={project.images[currentImageIndex]?.url || ''}
        imageAlt={project.images[currentImageIndex]?.alt || ''}
      />
    </div>
  );
}
