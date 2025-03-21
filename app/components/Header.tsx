import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

interface HeaderProps {
	toggleTheme: () => void;
	isDarkMode: boolean;
}

export default function Header({ toggleTheme, isDarkMode }: HeaderProps) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			if (isScrolled !== scrolled) {
				setScrolled(isScrolled);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [scrolled]);

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-2" : "bg-transparent py-4"}`}>
			<div className="container mx-auto px-6 flex items-center justify-between">
				<Link to="/" className="font-bold text-2xl text-gray-800 dark:text-white flex items-center">
					<span className="text-blue-500">Dev</span>
					<span className="text-purple-500">Portfolio</span>
				</Link>

				<nav className="hidden md:block">
					<ul className="flex space-x-8">
						<li>
							<Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								홈
							</Link>
						</li>
						<li>
							<Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								프로젝트
							</Link>
						</li>
						<li>
							<Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								소개
							</Link>
						</li>
						<li>
							<Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								연락처
							</Link>
						</li>
					</ul>
				</nav>

				<div className="flex items-center space-x-4">
					<button
						onClick={toggleTheme}
						className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-800/50 dark:hover:bg-gray-700/70 transition-colors"
						aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
					>
						{isDarkMode ? (
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
								<path
									fillRule="evenodd"
									d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-indigo-300" viewBox="0 0 20 20" fill="currentColor">
								<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
							</svg>
						)}
					</button>

					<button className="md:hidden text-gray-800 dark:text-white">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
}
