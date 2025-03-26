import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'ZERO ONE Inc. | 자연과 과기술이 공존하는 길' },
    { name: 'description', content: '유기성 폐기물 자원화 연구기업 제로원이 동행합니다' },
    { name: 'keywords', content: '환경기술, 폐기물 관리, 자원화, 제로원, 친환경 솔루션' },
    { property: 'og:title', content: 'ZERO ONE Inc. | 자연과 과기술이 공존하는 길' },
    { property: 'og:description', content: '유기성 폐기물 자원화 연구기업 제로원이 동행합니다' },
    { property: 'og:type', content: 'website' },
  ];
};

// 솔루션 데이터
const solutions = [
  {
    id: 1,
    title: '폐기물 자원화 시스템',
    description:
      '유기성 폐기물을 재활용 가능한 자원으로 변환하는 혁신적인 시스템으로, 비용 절감과 환경 영향 최소화를 동시에 실현합니다.',
    icon: '♻️',
    benefits: ['비용 절감 30%', '탄소 배출량 감소', '자원 순환 효율성 증가', '폐기물 처리 규제 준수'],
    details: '식품 폐기물의 열분해 기술과 자원화 공정을 통해 친환경 비료와 에너지를 생산합니다.',
  },
  {
    id: 2,
    title: '환경 모니터링 솔루션',
    description: '실시간 데이터 분석을 통한 정확한 환경 영향 평가 시스템으로 ESG 점수 향상에 기여합니다.',
    icon: '📊',
    benefits: ['실시간 데이터 분석', '규제 준수 보장', '환경 영향 최소화', 'ESG 성과 보고서 자동 생성'],
    details: '디지털 트윈 기술을 활용한 실시간 폐기물 발생량 추적 및 자원화 효율성 측정 시스템입니다.',
  },
  {
    id: 3,
    title: '지속가능 컨설팅',
    description: '기업별 맞춤형 환경 솔루션 및 ESG 전략 컨설팅으로 지속가능한 경영을 지원합니다.',
    icon: '💼',
    benefits: ['ESG 점수 향상', '브랜드 가치 상승', '지속가능 경영 지원', '탄소 중립 로드맵 제공'],
    details:
      '폐기물 저감 및 자원 순환 계획 수립부터 구현까지 기업의 지속가능한 성장을 위한 전략적 파트너십을 제공합니다.',
  },
];

// 고객 사례
const caseStudies = [
  {
    id: 1,
    company: '대형 식품 제조업체 A',
    result: '폐기물 처리 비용 35% 절감, 연간 CO2 배출량 1,200톤 감소, ESG 평가 20점 상승',
    logo: '/images/company-a-logo.png',
  },
  {
    id: 2,
    company: '종합 물류 기업 B',
    result: '자원 재활용률 52% 증가, 환경 규제 위반 리스크 제로화, 식품 폐기물의 80%를 비료화',
    logo: '/images/company-b-logo.png',
  },
  {
    id: 3,
    company: '지방자치단체 C',
    result: '주민 만족도 40% 상승, 폐기물 관리 효율성 2배 향상, 지역 순환 경제 구축 성공',
    logo: '/images/company-c-logo.png',
  },
];

// 환경 영향 데이터
const environmentalImpacts = [
  {
    id: 1,
    title: '탄소발자국 감소',
    description: '식품 폐기물의 효율적인 처리로 온실가스 배출량을 크게 줄이고 환경 영향을 최소화합니다.',
    icon: '🌱',
    stats: '연간 1,500톤 CO2 감소',
  },
  {
    id: 2,
    title: '순환 경제 구현',
    description: '버려지는 식품 폐기물을 100% 자원화하여 친환경 비료와 에너지로 전환, 완전한 순환 고리를 구축합니다.',
    icon: '🔄',
    stats: '폐기물의 100% 자원화',
  },
  {
    id: 3,
    title: '지속가능한 환경 조성',
    description: '메탄가스 발생을 원천 차단하고 토양과 수질 오염을 방지하여 지속가능한 미래 환경을 조성합니다.',
    icon: '🌍',
    stats: '환경오염물질 95% 저감',
  },
];

export default function ZeroOne() {
  const heroRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // 모달 열릴 때 배경 스크롤 방지
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // 모달 닫힐 때 스크롤 복원
  };

  return (
    <main className="min-h-screen text-gray-800 overflow-x-hidden">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md border-b border-gray-200 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/zero1ne" className="font-bold text-xl flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2"
            >
              <img src="/images/zero1ne-logo.png" alt="Zero One Logo" className="h-10" />
              <span className="text-[#0d5932] font-bold ml-2">ZERO ONE Inc.</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {['소개', '솔루션', 'R&D', '도입사례', '문의하기'].map((item, index) => (
              <a
                key={index}
                href={item === '문의하기' ? '#' : `#${item}`}
                onClick={
                  item === '문의하기'
                    ? e => {
                        e.preventDefault();
                        openModal();
                      }
                    : undefined
                }
                className="text-sm font-medium text-gray-700 hover:text-[#0d5932] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center">
            <button
              onClick={openModal}
              className="px-4 py-2 bg-[#0d5932] hover:bg-[#084526] text-white rounded-md transition-colors shadow-md"
            >
              솔루션 도입 문의
            </button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: 'linear-gradient(150deg, rgba(255, 255, 255, 0.9) 40%, rgba(13, 89, 50, 0.15) 100%)',
        }}
      >
        {/* 배경 요소 */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/nature-tech-bg.jpg"
            alt="자연과 기술"
            className="w-full h-full object-cover object-center opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    식품 폐기물의 <br className="hidden sm:block" />
                  </motion.div>
                  <motion.span
                    className="text-[#0d5932] font-extrabold relative inline-block"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    순환 경제 구축
                    <motion.svg
                      viewBox="0 0 300 15"
                      className="absolute -bottom-1 left-0 w-full h-3 overflow-visible"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      <motion.path
                        d="M0,5 Q150,-10 300,5"
                        fill="none"
                        stroke="#0d5932"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.9, ease: 'easeInOut' }}
                      />
                    </motion.svg>
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                  제로원은 혁신적인 열분해 기술과 디지털 트윈 시스템으로 식품 폐기물의 가치를 재발견하고, 지속가능한
                  미래를 구축합니다.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#084526' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(solutionsRef)}
                  className="px-8 py-4 rounded-lg bg-[#0d5932] text-white font-medium transition-all duration-300 shadow-lg"
                >
                  솔루션 알아보기
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#f8f9fa' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openModal}
                  className="px-8 py-4 rounded-lg bg-white text-[#0d5932] font-medium transition-all duration-300 border-2 border-[#0d5932] shadow-lg"
                >
                  무료 상담 신청
                </motion.button>
              </motion.div>

              {/* 간단한 통계 인포그래픽 */}
              <motion.div
                className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {[
                  { value: '1,500톤', label: '연간 CO2 감소' },
                  { value: '100%', label: '자원 재활용률' },
                  { value: '30%', label: '비용 절감' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-2 rounded-lg"
                    whileHover={{ y: -5, backgroundColor: 'rgba(13, 89, 50, 0.05)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="text-[#0d5932] font-bold text-2xl"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.2 + index * 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* 히어로 이미지 */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="relative z-20"
              >
                <div className="relative max-w-md mx-auto">
                  <motion.img
                    src="https://zero1ne.com/theme/basic/img/main/visual_02.png"
                    alt="제로원 환경 기술"
                    className="w-full h-auto rounded-xl shadow-2xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* 3D 효과를 위한 음영 요소 */}
                  <div className="absolute inset-0 rounded-xl shadow-inner" />
                </div>
              </motion.div>

              {/* 배경 장식 효과 */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#0d5932]/20 to-blue-600/20 blur-2xl"
                animate={{
                  opacity: [0.5, 0.7, 0.5],
                  scale: [0.9, 1.02, 0.9],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>

        {/* 스크롤 다운 표시 */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 mx-auto flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => scrollToSection(solutionsRef)}
            whileHover={{ scale: 1.1 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-gray-500 mb-2">자세히 알아보기</span>
            <div className="w-10 h-10 rounded-full bg-[#0d5932]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#0d5932]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 솔루션 소개 섹션 */}
      <section ref={solutionsRef} id="solutions" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-[#0d5932] mb-4"
            >
              제로원 솔루션
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              유기성 폐기물 자원화를 위한 연구기업 제로원이 제안하는 지속가능한 솔루션입니다
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden group"
              >
                <div className="relative mb-6 overflow-hidden rounded-lg h-40">
                  <motion.img
                    src={`/images/solution-${solution.id}.jpg`}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-3">
                      <div className="text-3xl text-white mb-1">{solution.icon}</div>
                      <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="h-32">
                  <p className="text-gray-600 mb-4 line-clamp-2">{solution.description}</p>
                  <p className="text-gray-600 text-sm mb-4 italic line-clamp-2">{solution.details}</p>
                </div>

                <div className="space-y-2 mb-4">
                  {solution.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 text-[#0d5932] mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <motion.div
                  className="mt-4 text-[#0d5932] font-medium flex items-center text-sm cursor-pointer group-hover:underline"
                  whileHover={{ x: 5 }}
                >
                  <span>자세히 알아보기</span>
                  <svg
                    className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </motion.div>

                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#0d5932]/10 rounded-full opacity-20"></div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={openModal}
              className="inline-block px-8 py-3 bg-[#0d5932] text-white font-medium rounded-lg hover:bg-[#084526] transition-colors shadow-md"
            >
              맞춤형 솔루션 문의하기
            </button>
          </div>
        </div>
      </section>

      {/* 주요 솔루션 상세 섹션 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-[#0d5932] mb-4"
            >
              핵심 기술 솔루션
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              제로원의 핵심 기술이 적용된 &apos;담비&apos;와 &apos;쓸모&apos; 솔루션을 소개합니다
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* 쓸모 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#0d5932]/5 rounded-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src="/images/solution-system.jpg"
                    alt="쓸모 식품 폐기물 자원화 시스템"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="flex items-center mb-1">
                        <div className="text-5xl mr-3">♻️</div>
                        <h3 className="text-2xl font-bold text-white">담비</h3>
                      </div>
                      <p className="text-white/80 text-sm">식품 폐기물 자원화 시스템</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-grow">
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>담비</strong>는 식품 폐기물을 고부가가치 자원으로 변환하는 제로원의 핵심 솔루션입니다.
                      열분해 기술과 유용한 물질 추출 시스템을 통해 식품 폐기물에서 자원을 회수하고 친환경 비료로
                      재탄생시킵니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      음식물 폐기물 처리 비용을 줄이고, 환경 규제를 준수하며, 탄소배출량을 감소시키는 완전한 폐기물 순환
                      솔루션을 제공합니다. 제로원의 특허받은 열분해 기술은 메탄 발생을 차단하고 고품질 비료를
                      생산합니다.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                    <h4 className="font-semibold text-[#0d5932] mb-3">주요 특징</h4>
                    <ul className="space-y-3">
                      <motion.li
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0d5932]/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-[#0d5932]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <span>위생적이고 빠르게 음식물 쓰레기 처리, 악취 없음</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0d5932]/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-[#0d5932]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <span>식품 폐기물을 유용한 자원으로 100% 전환</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0d5932]/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-[#0d5932]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <span>레스토랑, 호텔, 식품 제조업체에 맞춤형 규모 제공</span>
                      </motion.li>
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-[#0d5932] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#084526] transition-colors"
                    onClick={openModal}
                  >
                    <span>도입 문의하기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* 담비 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#0d5932]/5 rounded-xl overflow-hidden h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src="/images/monitoring-system.jpg"
                    alt="담비 환경 모니터링 시스템"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="flex items-center mb-1">
                        <div className="text-5xl mr-3">📊</div>
                        <h3 className="text-2xl font-bold text-white">쓸모</h3>
                      </div>
                      <p className="text-white/80 text-sm">환경 모니터링 시스템</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-grow">
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>쓸모</strong>는 식품 폐기물 처리 과정을 실시간으로 모니터링하고 데이터를 분석하는 환경
                      모니터링 플랫폼입니다. 디지털 트윈 기술로 폐기물 발생부터 처리까지 전 과정을 추적하고, 최적의
                      자원화 방안을 제시합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      쓸모는 AI 기반 예측 모델을 통해 폐기물 발생량을 예측하고 맞춤형 처리 방안을 제안합니다.
                      탄소배출량, 에너지 효율성, 친환경성 등 다양한 환경 데이터를 측정하여 ESG 성과 보고서를 자동으로
                      생성합니다.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                    <h4 className="font-semibold text-[#0d5932] mb-3">주요 특징</h4>
                    <ul className="space-y-3">
                      <motion.li
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0d5932]/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-[#0d5932]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <span>식품 폐기물 처리 과정의 실시간 모니터링 및 데이터 수집</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0d5932]/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-[#0d5932]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <span>인공지능 기반 폐기물 발생량 예측 및 처리 최적화</span>
                      </motion.li>
                      <motion.li
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#0d5932]/10 flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-[#0d5932]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <span>환경 성과 데이터 측정과 ESG 맞춤형 보고서 생성</span>
                      </motion.li>
                    </ul>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-[#0d5932] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#084526] transition-colors"
                    onClick={openModal}
                  >
                    <span>도입 문의하기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 max-w-3xl mx-auto mb-8">
                제로원의 &apos;쓸모&apos;와 &apos;담비&apos; 솔루션은 개별적으로도 강력하지만, 함께 적용될 때 식품
                폐기물 관리에 있어 최고의 시너지 효과를 발휘합니다. 식품 폐기물의 순환 경제 구축을 위한 완전한 생태계를
                구현하세요.
              </p>
              <button
                onClick={openModal}
                className="px-8 py-3 bg-[#0d5932] text-white font-medium rounded-lg hover:bg-[#084526] transition-colors shadow-md"
              >
                솔루션 상담 받기
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 도입 성공 사례 */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-[#0d5932] mb-4"
            >
              도입 성공 사례
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              제로원 솔루션을 도입하여 성과를 이룬 기업들의 사례를 확인하세요
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              >
                <div className="h-16 flex items-center justify-center mb-6">
                  <img src={study.logo} alt={study.company} className="h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{study.company}</h3>
                <p className="text-gray-600">{study.result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 도입 프로세스 */}
      <section className="py-20 px-4 bg-[#0d5932]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-[#0d5932] mb-4"
            >
              솔루션 도입 프로세스
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              간단한 4단계 프로세스로 빠르게 솔루션을 도입할 수 있습니다
            </motion.p>
          </div>

          <div className="relative">
            {/* 타임라인 연결선 */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#0d5932]/20 -translate-x-1/2 z-0"></div>

            {/* 도입 과정 타임라인 */}
            {[
              {
                title: '문의 및 상담',
                description:
                  '전문 컨설턴트와의 초기 상담을 통해 귀사의 폐기물 관리 현황과 요구사항을 파악합니다. 이 단계에서는 기초 데이터 수집과 목표 설정이 이루어집니다.',
                icon: '💬',
                image: '/images/consultation.jpg',
              },
              {
                title: '현장 분석',
                description:
                  '현장 방문을 통해 폐기물 발생량과 특성을 분석합니다. 전문 팀이 현장의 공간, 시설, 프로세스를 검토하고 최적의 솔루션 도입을 위한 준비를 진행합니다.',
                icon: '🔍',
                image: '/images/analysis.jpg',
              },
              {
                title: '맞춤형 솔루션 제안',
                description:
                  '분석 결과를 바탕으로 맞춤형 솔루션을 제안합니다. 식품 폐기물 처리량, 공간 제약, 예산 등을 고려하여 최적화된 제품과 서비스 조합을 제시합니다.',
                icon: '📋',
                image: '/images/solution-proposal.jpg',
              },
              {
                title: '도입 및 사후관리',
                description:
                  '솔루션 도입 후에도 정기적인 모니터링과 기술 지원을 제공합니다. 지속적인 데이터 분석을 통해 성과를 측정하고 필요시 최적화 방안을 제안합니다.',
                icon: '🔄',
                image: '/images/implementation.jpg',
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 md:mb-24 relative ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* 타임라인 노드 */}
                <motion.div
                  className="w-16 h-16 rounded-full bg-[#0d5932] text-white flex items-center justify-center text-xl z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-2xl">{step.icon}</div>
                </motion.div>

                {/* 내용 */}
                <div className={`md:w-5/12 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-xl shadow-md p-6 transform hover:-translate-y-2 transition-transform duration-300"
                  >
                    <span className="inline-block px-3 py-1 bg-[#0d5932]/10 text-[#0d5932] rounded-full text-sm font-medium mb-3">
                      {`STEP ${index + 1}`}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 inline-flex items-center text-[#0d5932] font-medium"
                      onClick={openModal}
                    >
                      <span>상담 신청하기</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </motion.button>
                  </motion.div>
                </div>

                {/* 이미지 */}
                <motion.div
                  className="md:w-5/12 rounded-xl overflow-hidden shadow-lg h-64 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-white font-medium text-lg">{step.title}</div>
                    <div className="text-white/80 text-sm">제로원 솔루션</div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-[#0d5932] text-white font-medium rounded-lg shadow-md hover:bg-[#084526] transition-all"
              onClick={openModal}
            >
              지금 시작하기
            </motion.button>
          </div>
        </div>
      </section>

      {/* 환경 영향 섹션 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-[#0d5932] mb-4"
            >
              환경적 영향
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              제로원의 솔루션은 단순한 폐기물 처리를 넘어 지구 환경에 실질적인 변화를 가져옵니다
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {environmentalImpacts.map((impact, index) => (
              <motion.div
                key={impact.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg overflow-hidden relative group"
              >
                <div className="h-48 bg-gradient-to-br from-[#0d5932] to-[#084526] flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="text-8xl text-white/30 absolute"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5, repeat: Infinity },
                    }}
                  >
                    {impact.icon}
                  </motion.div>

                  <div className="z-10 text-center px-4">
                    <motion.h3
                      className="text-2xl font-bold text-white mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {impact.title}
                    </motion.h3>
                    <motion.div
                      className="text-3xl font-bold text-white mb-1"
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {impact.stats.split(' ')[0]}
                    </motion.div>
                    <div className="text-white/80 text-sm">{impact.stats.split(' ').slice(1).join(' ')}</div>
                  </div>

                  {/* 데이터 시각화 효과 - 원형 차트 */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <svg width="280" height="280" viewBox="0 0 100 100" className="opacity-20">
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="white"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        whileInView={{ strokeDashoffset: index === 0 ? 28 : index === 1 ? 0 : 14 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600">{impact.description}</p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {index === 0 ? '전년 대비 감소율' : index === 1 ? '자원화 효율' : '환경 개선 효과'}
                      </div>
                      <div className="text-[#0d5932] font-semibold">
                        {index === 0 ? '42%' : index === 1 ? '100%' : '95%'}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#0d5932] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: index === 0 ? '42%' : index === 1 ? '100%' : '95%' }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 문의 섹션 */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-[#0d5932] mb-6"
            >
              Contact
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              폐기물 처리 비용 절감, 환경 영향 최소화, ESG 점수 향상을 위한 제로원의 솔루션에 대해 문의하세요. 24시간
              이내 답변드립니다.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 w-full text-center sm:text-left">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="w-8 h-8 text-[#0d5932]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-lg">주소</p>
                      <p className="text-gray-600">서울특별시 강남구 테헤란로 123, 제로원 빌딩 10층</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 w-full text-center sm:text-left">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="w-8 h-8 text-[#0d5932]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-lg">전화</p>
                      <p className="text-gray-600">02-123-4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 w-full text-center sm:text-left">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="w-8 h-8 text-[#0d5932]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium text-lg">이메일</p>
                      <p className="text-gray-600">contact@zeroone.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <button
                  onClick={openModal}
                  className="px-8 py-3 bg-[#0d5932] text-white font-medium rounded-lg hover:bg-[#084526] transition-colors shadow-md"
                >
                  지금 문의하기
                </button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img src="/zero1ne-map.png" alt="제로원 위치 지도" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-12 bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">ZERO ONE Inc.</h3>
              <p className="mb-4">자연과 과기술이 공존하는 길, 유기성 폐기물 자원화 연구기업 제로원이 동행합니다.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">바로가기</h3>
              <ul className="space-y-2">
                {['회사소개', '솔루션', 'R&D', '도입사례', '문의하기'].map((item, index) => (
                  <li key={index}>
                    <a href={`#${item}`} className="hover:text-[#6fcf97] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">연락처</h3>
              <p className="mb-2">서울특별시 강남구 테헤란로 123, 제로원 빌딩 10층</p>
              <p className="mb-2">02-123-4567</p>
              <p className="mb-4">contact@zeroone.com</p>

              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
                  <a
                    key={index}
                    href={`#${social}`}
                    className="text-gray-300 hover:text-[#6fcf97] transition-colors"
                    aria-label={social}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} ZERO ONE Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 문의하기 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#0d5932]">솔루션 도입 문의</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="닫기"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d5932] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      회사명 *
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d5932] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d5932] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d5932] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      문의 내용 *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d5932] focus:border-transparent"
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="h-4 w-4 text-[#0d5932] focus:ring-[#0d5932] border-gray-300 rounded mt-1"
                      required
                    />
                    <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                      개인정보 수집 및 이용에 동의합니다. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0d5932] text-white font-medium rounded-md hover:bg-[#084526] transition-colors shadow-md"
                  >
                    문의하기
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
