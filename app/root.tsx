import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, createCookieSessionStorage } from "@remix-run/node";
import { useEffect } from "react";

import Header from "~/components/Header";
import { useThemeStore } from "~/store/themeStore";
import "./tailwind.css";

// 테마 세션 관리를 위한 세션 스토리지 생성
const themeStorage = createCookieSessionStorage({
	cookie: {
		name: "theme",
		secure: process.env.NODE_ENV === "production",
		secrets: ["s3cr3t"], // 실제 운영에서는 환경 변수로 관리해야 합니다
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30, // 30일
		httpOnly: true,
	},
});

// 테마 로더 함수
export async function loader({ request }: LoaderFunctionArgs) {
	const session = await themeStorage.getSession(request.headers.get("Cookie"));
	const theme = session.get("theme") ?? "dark"; // 기본값은 다크 모드

	return json({
		theme,
	});
}

// 테마 액션 함수 - 테마 변경 시 실행
export async function action({ request }: LoaderFunctionArgs) {
	const session = await themeStorage.getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const theme = formData.get("theme");

	session.set("theme", theme);

	return json(
		{ success: true },
		{
			headers: {
				"Set-Cookie": await themeStorage.commitSession(session),
			},
		}
	);
}

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
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

function ThemeHydration() {
	const { theme: initialTheme } = useLoaderData<typeof loader>();
	const setTheme = useThemeStore((state) => state.setTheme);

	// 서버에서 로드한 테마로 Zustand 스토어 초기화
	useEffect(() => {
		setTheme(initialTheme);
		// 스토어 하이드레이션 처리
		useThemeStore.persist.rehydrate();
	}, [initialTheme, setTheme]);

	return null;
}

export default function App() {
	return (
		<html lang="ko">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
				<div className="flex flex-col min-h-screen">
					<ThemeHydration />
					<Header />
					<main className="flex-grow pt-16">
						<Outlet />
					</main>
					<footer className="py-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
						<div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} 포트폴리오. 모든 권리 보유.</div>
					</footer>
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
