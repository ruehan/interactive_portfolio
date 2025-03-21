import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
	theme: string;
	toggleTheme: () => void;
	setTheme: (theme: string) => void;
};

// 테마 변경 시 서버에 저장하는 함수
const saveThemeToServer = (theme: string) => {
	if (typeof window !== "undefined") {
		fetch("/", {
			method: "POST",
			body: new URLSearchParams({ theme }),
		}).catch((error) => {
			console.error("테마 저장 중 오류:", error);
		});
	}
};

// Zustand 4.5.0 버전에 맞게 스토어 생성
export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			theme: "light", // 기본 테마
			toggleTheme: () =>
				set((state: ThemeState) => {
					const newTheme = state.theme === "light" ? "dark" : "light";
					saveThemeToServer(newTheme);
					return { theme: newTheme };
				}),
			setTheme: (theme: string) => {
				saveThemeToServer(theme);
				set({ theme });
			},
		}),
		{
			name: "theme-storage", // localStorage에 저장될 키 이름
			// 서버 사이드 렌더링 시 localStorage가 없으므로 skipHydration 사용
			skipHydration: true,
		}
	)
);

// 브라우저에서 HTML class를 업데이트하는 함수
export const updateHtmlClass = (theme: string) => {
	if (typeof document !== "undefined") {
		document.documentElement.className = theme;
	}
};
