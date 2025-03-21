import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  theme: string;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
};

const saveThemeToServer = (theme: string) => {
  if (typeof window !== 'undefined') {
    fetch('/', {
      method: 'POST',
      body: new URLSearchParams({ theme }),
    }).catch(error => {
      console.error('테마 저장 중 오류:', error);
    });
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'light', // 기본 테마
      toggleTheme: () =>
        set((state: ThemeState) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          saveThemeToServer(newTheme);
          return { theme: newTheme };
        }),
      setTheme: (theme: string) => {
        saveThemeToServer(theme);
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
      skipHydration: true,
    },
  ),
);

export const updateHtmlClass = (theme: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.className = theme;
  }
};
