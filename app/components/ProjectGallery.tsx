import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, PanInfo } from 'framer-motion';
import { Link } from '@remix-run/react';
import type { Project, ProjectVideo } from '~/models/project';
import VideoModal from './VideoModal';

interface ProjectGalleryProps {
  projects: Project[];
  title: string;
}

export default function ProjectGallery({ projects, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const [selectedVideo, setSelectedVideo] = useState<ProjectVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const x = useMotionValue(0);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, projects.length]);

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
                  ease: 'easeInOut',
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: {
                  duration: 0.2,
                  ease: 'easeInOut',
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
              <ProjectCard
                project={projects[currentIndex]}
                onOpenVideoModal={video => {
                  setSelectedVideo(video);
                  setIsModalOpen(true);
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 탐색 버튼 */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-blue-600 dark:bg-blue-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
              }`}
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
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white dark:hover:bg-gray-800'
          }`}
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
            }
          }}
          disabled={currentIndex === 0}
          aria-label="이전 프로젝트"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md z-10 ${
            currentIndex === projects.length - 1
              ? 'opacity-50 cursor-not-allowed'
              : 'opacity-100 hover:bg-white dark:hover:bg-gray-800'
          }`}
          onClick={() => {
            if (currentIndex < projects.length - 1) {
              setCurrentIndex(currentIndex + 1);
            }
          }}
          disabled={currentIndex === projects.length - 1}
          aria-label="다음 프로젝트"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 비디오 모달 */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} video={selectedVideo} />
    </div>
  );
}

function ProjectCard({
  project,
  onOpenVideoModal,
}: {
  project: Project;
  onOpenVideoModal: (video: ProjectVideo) => void;
}) {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out group h-full">
      {/* 썸네일 이미지 */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

        {/* 기술 뱃지 */}
        <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1 max-w-[70%]">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech.name} className="text-xs bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm">
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* 프로젝트 정보 */}
      <div className="p-5">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(project.date.start).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
          })}
        </span>
        <h3 className="text-xl font-bold mt-1 mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* 프로젝트 링크 */}
        <div className="flex justify-between items-center">
          <Link
            to={`/project/${project.id}`}
            className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
          >
            자세히 보기
            <span aria-hidden="true"> →</span>
          </Link>

          <div className="flex space-x-2">
            {project.videos && project.videos.length > 0 ? (
              <button
                onClick={() => onOpenVideoModal(project.videos![0])}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                title="데모 영상 보기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            ) : project.links.some(link => link.type === 'demo') ? (
              <button
                onClick={() => {
                  // 비디오가 없는 경우, demo 링크를 새 창에서 열지 않고 현재 UI에서 모달로 보여주기 위한 더미 비디오 객체 생성
                  const demoUrl = project.links.find(link => link.type === 'demo')?.url || '';
                  const dummyVideo: ProjectVideo = {
                    url: demoUrl,
                    thumbnail: project.thumbnail,
                    duration: 'N/A',
                    title: `${project.title} 데모`,
                  };
                  onOpenVideoModal(dummyVideo);
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                title="데모 영상 보기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            ) : null}

            {project.links.some(link => link.type === 'github') && (
              <a
                href={project.links.find(link => link.type === 'github')?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                title="소스 코드 보기"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
