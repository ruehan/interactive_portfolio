import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

const techStack: TechItem[] = [
  { name: 'React', icon: 'react.svg', color: '#61dafb' },
  { name: 'Next.js', icon: 'nextjs.svg', color: '#000000' },
  { name: 'Remix', icon: 'remix.svg', color: '#3f4cf9' },
  { name: 'TypeScript', icon: 'typescript.svg', color: '#3178c6' },
  { name: 'JavaScript', icon: 'javascript.svg', color: '#f7df1e' },
  { name: 'Tailwind CSS', icon: 'tailwindcss.svg', color: '#38b2ac' },
  { name: 'Node.js', icon: 'nodejs.svg', color: '#339933' },
  { name: 'Python', icon: 'python.svg', color: '#3776ab' },
  { name: 'FastAPI', icon: 'fastapi.svg', color: '#000000' },
  { name: 'Flask', icon: 'flask.svg', color: '#47a248' },
  { name: 'Docker', icon: 'docker.svg', color: '#2496ed' },
  { name: 'Git', icon: 'git.svg', color: '#f05032' },
  { name: 'AWS', icon: 'aws.svg', color: '#ff9900' },
  { name: 'Firebase', icon: 'firebase.svg', color: '#ffca28' },
  { name: 'GCP', icon: 'gcp.svg', color: '#4285f4' },
  { name: 'MySQL', icon: 'mysql.svg', color: '#00618a' },
];

interface TechIconProps {
  item: TechItem;
  index: number;
}

const TechIcon = ({ item, index }: TechIconProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 },
      }}
      className="flex flex-col items-center p-4 rounded-xl bg-slate-800/90 dark:bg-black/70 hover:bg-slate-900/90 dark:hover:bg-black/90 transition-colors"
    >
      <div
        className="w-16 h-16 mb-3 rounded-lg p-2 flex items-center justify-center backdrop-blur-sm transition-all duration-300"
        style={{
          backgroundColor: `${item.color}50`,
          boxShadow: `0 0 15px ${item.color}60, inset 0 0 10px ${item.color}30`,
        }}
      >
        <img
          src={`/icons/${item.icon}`}
          alt={`${item.name} icon`}
          className={`w-10 h-10 object-contain ${item.name === 'Next.js' || item.name === 'FastAPI' ? 'invert' : ''}`}
          style={{
            filter: `drop-shadow(0 0 4px ${item.color})`,
          }}
        />
      </div>
      <span
        className="text-sm font-medium"
        style={{
          color: item.name === 'Next.js' || item.name === 'FastAPI' ? '#ffffff' : item.color,
          textShadow: `0 0 8px ${item.color}70`,
        }}
      >
        {item.name}
      </span>
    </motion.div>
  );
};

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section className="py-16 relative z-10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">기술 스택</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">제가 자주 사용하고 경험이 있는 기술들입니다.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-5 bg-slate-200/80 dark:bg-black/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
          {techStack.map((tech, index) => (
            <TechIcon key={tech.name} item={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
