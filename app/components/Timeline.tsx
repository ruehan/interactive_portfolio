import { motion } from "framer-motion";
import { useRef } from "react";

export type TimelineItem = {
	id: string;
	date: string;
	title: string;
	description: string;
	icon: string;
};

interface TimelineProps {
	items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	const fadeInUpVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.5,
				ease: "easeOut",
			},
		}),
	};

	return (
		<div className="relative pb-12" ref={containerRef}>
			{/* 타임라인 중앙선 */}
			<div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500"></div>

			{items.map((item, index) => (
				<motion.div
					key={item.id}
					className={`flex mb-12 items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					custom={index}
					variants={fadeInUpVariants}
				>
					<div className={`w-1/2 ${index % 2 === 0 ? "pr-10 text-right" : "pl-10 text-left"}`}>
						<span className="text-blue-400 font-mono text-sm tracking-wider">{item.date}</span>
						<h3 className="text-xl font-semibold mt-1 text-white">{item.title}</h3>
						<p className="mt-2 text-gray-400">{item.description}</p>
					</div>

					<div className="absolute left-1/2 transform -translate-x-1/2">
						<motion.div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border-4 border-blue-500 text-white" whileHover={{ scale: 1.2 }}>
							<span className="text-lg">{item.icon}</span>
						</motion.div>
					</div>

					<div className={`w-1/2 ${index % 2 === 0 ? "pl-10" : "pr-10"}`}></div>
				</motion.div>
			))}
		</div>
	);
}
