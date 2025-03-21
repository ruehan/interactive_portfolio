import { motion } from 'framer-motion';
import { useState } from 'react';

export interface CardContent {
  id: string;
  front: {
    title: string;
    subtitle?: string;
    image?: string;
  };
  back: {
    title?: string;
    description: string;
    details?: {
      label: string;
      value: string;
    }[];
  };
}

interface FlipCardProps {
  card: CardContent;
  className?: string;
}

export default function FlipCard({ card, className = '' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <button
      className={`perspective-1000 relative w-full h-[350px] text-left ${className}`}
      onClick={toggleFlip}
      aria-label={isFlipped ? '카드 뒤집기' : '자세히 보기'}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleFlip();
        }
      }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d duration-700 ease-in-out"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* 카드 전면 */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-gray-800 border border-gray-700 p-6 flex flex-col">
          {card.front.image && (
            <div className="w-full h-32 overflow-hidden rounded-lg mb-4">
              <img src={card.front.image} alt={card.front.title} className="w-full h-full object-cover object-center" />
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-2">{card.front.title}</h3>
          {card.front.subtitle && <p className="text-blue-400 mb-4">{card.front.subtitle}</p>}
          <div className="flex-grow flex items-end justify-center">
            <span className="text-gray-400 text-sm">클릭하여 자세히 보기</span>
          </div>
        </div>

        {/* 카드 후면 */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-gray-800 border border-gray-700 p-6 flex flex-col rotate-y-180">
          {card.back.title && <h3 className="text-xl font-bold text-white mb-2">{card.back.title}</h3>}
          <p className="text-gray-300 mb-4">{card.back.description}</p>

          {card.back.details && (
            <div className="space-y-2 flex-grow">
              {card.back.details.map((detail, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-400">{detail.label}:</span>
                  <span className="text-white">{detail.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-4">
            <span className="text-gray-400 text-sm">클릭하여 뒤로</span>
          </div>
        </div>
      </motion.div>
    </button>
  );
}

/*
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
*/
