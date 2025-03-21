import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { json, createCookieSessionStorage } from '@remix-run/node';
import { useEffect, useState } from 'react';

import Header from '~/components/Header';
import ScrollIndicator from '~/components/ScrollIndicator';
import CustomCursor from '~/components/CustomCursor';
import { useThemeStore } from '~/store/themeStore';
import { getEasterEggTracker, COMMANDS } from '~/utils/easterEgg';
import { ClientOnly } from '~/components/ClientOnly';
import './tailwind.css';

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    secure: process.env.NODE_ENV === 'production',
    secrets: ['s3cr3t'],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'));
  const theme = session.get('theme') ?? 'dark';

  return json({
    theme,
  });
}

export async function action({ request }: LoaderFunctionArgs) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'));
  const formData = await request.formData();
  const theme = formData.get('theme');

  session.set('theme', theme);

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': await themeStorage.commitSession(session),
      },
    },
  );
}

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function CommandIndicator() {
  const [commandState, setCommandState] = useState({ isActive: false, currentInput: '' });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tracker = getEasterEggTracker();

    const intervalId = setInterval(() => {
      setCommandState(tracker.getCommandState());
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  if (!commandState.isActive) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-md z-50">
      <span className="text-indigo-400">$</span> {commandState.currentInput}
      <span className="animate-pulse ml-1">|</span>
    </div>
  );
}

function EasterEggInitializer() {
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = (path: string) => {
    window.location.href = path;
  };

  useEffect(() => {
    if (isInitialized || typeof window === 'undefined') return;

    const tracker = getEasterEggTracker();

    tracker.onKonamiCode(() => {
      alert("🎮 코나미 코드 활성화! 명령어 모드를 사용할 수 있습니다. '/'키를 눌러보세요.");
    });

    tracker.registerCommand(COMMANDS.GAME, () => {
      navigate('/easter/game');
    });

    tracker.registerCommand(COMMANDS.MATRIX, () => {
      document.documentElement.classList.add('matrix-effect');
      setTimeout(() => {
        document.documentElement.classList.remove('matrix-effect');
      }, 10000);
    });

    tracker.registerCommand(COMMANDS.RAINBOW, () => {
      document.documentElement.classList.add('rainbow-effect');
      setTimeout(() => {
        document.documentElement.classList.remove('rainbow-effect');
      }, 5000);
    });

    tracker.registerCommand(COMMANDS.GRAVITY, () => {
      document.documentElement.classList.add('gravity-effect');
      setTimeout(() => {
        document.documentElement.classList.remove('gravity-effect');
      }, 3000);
    });

    setIsInitialized(true);
  }, [isInitialized, navigate]);

  return null;
}

function ThemeHydration() {
  const { theme: initialTheme } = useLoaderData<typeof loader>();
  const setTheme = useThemeStore(state => state.setTheme);

  useEffect(() => {
    setTheme(initialTheme);
    useThemeStore.persist.rehydrate();
  }, [initialTheme, setTheme]);

  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="ko">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <title>{`${error.status} ${error.statusText}`}</title>
        </head>
        <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-indigo-600 mb-4">{error.status}</h1>
              <p className="text-2xl font-semibold mb-6">{error.statusText}</p>
              <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {error.data?.message || '페이지를 찾을 수 없습니다.'}
              </p>
              <a
                href="/"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors inline-block"
              >
                메인 페이지로 돌아가기
              </a>
            </div>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>오류 발생</title>
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">예상치 못한 오류가 발생했습니다</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              죄송합니다. 문제가 발생했습니다. 나중에 다시 시도해 주세요.
            </p>
            <a
              href="/"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors inline-block"
            >
              메인 페이지로 돌아가기
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const isHomePage = currentRoute?.id === 'routes/_index';

  const hasSpecialLayout = currentRoute?.id?.includes('easter');

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <ThemeHydration />

        {/* 프로그래시브 스크롤 인디케이터 */}
        <ScrollIndicator />

        {/* 커스텀 마우스 커서 */}
        <ClientOnly>{() => <CustomCursor />}</ClientOnly>

        {/* 이스터 에그 초기화 (클라이언트 사이드에서만) */}
        <ClientOnly>{() => <EasterEggInitializer />}</ClientOnly>

        {/* 명령어 모드 인디케이터 */}
        <ClientOnly>{() => <CommandIndicator />}</ClientOnly>

        {!hasSpecialLayout && (
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-grow ${isHomePage ? '' : 'pt-16'}`}>
              <Outlet />
            </main>
            <footer className="py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} 포트폴리오. 모든 권리 보유.
              </div>
            </footer>
          </div>
        )}

        {hasSpecialLayout && (
          <main>
            <Outlet />
          </main>
        )}

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
