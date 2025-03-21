import { useState, useEffect } from 'react';
import { Link, useLoaderData, useSearchParams } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import ProjectGallery from '~/components/ProjectGallery';
import { projects, getAllTechnologies, getAllProjectTypes, getProjectsByType } from '~/models/project';
import type { Project } from '~/models/project';

export const meta: MetaFunction = () => {
  return [
    { title: '프로젝트 갤러리 | 한규 포트폴리오' },
    {
      name: 'description',
      content: '한규의 포트폴리오 프로젝트 갤러리입니다. 웹, 모바일, 데스크톱 등 다양한 프로젝트를 확인해보세요.',
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const typeFilter = url.searchParams.get('type');
  const techFilter = url.searchParams.get('tech');

  const technologies = getAllTechnologies();
  const projectTypes = ['all', ...getAllProjectTypes()];

  let filteredProjects: Project[] = [...projects];

  if (typeFilter && typeFilter !== 'all') {
    filteredProjects = getProjectsByType(typeFilter);
  }

  if (techFilter) {
    filteredProjects = filteredProjects.filter(project => project.technologies.includes(techFilter));
  }

  return json({
    projects: filteredProjects,
    allProjects: projects,
    technologies,
    projectTypes,
    activeTypeFilter: typeFilter || 'all',
    activeTechFilter: techFilter || null,
  });
}

export function ErrorBoundary() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-6">오류가 발생했습니다</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        프로젝트 데이터를 불러오는 중에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export default function Projects() {
  const { projects, technologies, projectTypes, activeTypeFilter, activeTechFilter } = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();
  const [animateFilters, setAnimateFilters] = useState(false);

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === null || (value === 'all' && key === 'tech')) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  const handleTypeChange = (type: string) => {
    updateFilter('type', type === 'all' ? null : type);
  };

  const handleTechChange = (tech: string | null) => {
    updateFilter('tech', tech);
  };

  useEffect(() => {
    setAnimateFilters(true);
    const timer = setTimeout(() => setAnimateFilters(false), 500);
    return () => clearTimeout(timer);
  }, [activeTypeFilter, activeTechFilter]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">프로젝트 갤러리</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        다양한 기술 스택과 프로젝트 유형별로 필터링하여 프로젝트를 살펴보세요. 각 프로젝트를 클릭하면 상세 정보를 확인할
        수 있습니다.
      </p>

      {/* 필터링 섹션 */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">필터링</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              총 {projects.length}개 프로젝트 중{activeTechFilter ? ` ${activeTechFilter} 기술의 ` : ' '}
              {activeTypeFilter !== 'all' ? `${activeTypeFilter} 유형의 ` : ''}
              프로젝트를 표시합니다.
            </p>
          </div>
        </div>

        {/* 필터 컨트롤 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 프로젝트 유형 필터 */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-medium mb-3">프로젝트 유형</h3>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                    type === activeTypeFilter
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  } ${animateFilters && type === activeTypeFilter ? 'animate-pulse' : ''}`}
                >
                  {type === 'all' ? '모든 유형' : type}
                </button>
              ))}
            </div>
          </div>

          {/* 기술 스택 필터 */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="font-medium mb-3">기술 스택</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTechChange(null)}
                className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                  !activeTechFilter
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                모든 기술
              </button>

              {technologies.map(tech => (
                <button
                  key={tech}
                  onClick={() => handleTechChange(tech)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                    tech === activeTechFilter
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  } ${animateFilters && tech === activeTechFilter ? 'animate-pulse' : ''}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 프로젝트 뷰 */}
      <ProjectGallery projects={projects} title={projects.length > 0 ? '프로젝트' : '필터링된 프로젝트가 없습니다'} />
    </div>
  );
}
