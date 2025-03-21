import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, createCookieSessionStorage } from "@remix-run/node";
import { useState, useEffect } from "react";

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

export default function App() {
	const { theme: initialTheme } = useLoaderData<typeof loader>();
	const [theme, setTheme] = useState<string | null>(null);

	// hydration 불일치 방지를 위한 초기화
	useEffect(() => {
		setTheme(initialTheme);
	}, [initialTheme]);

	// 테마 전환 함수
	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);

		// 쿠키 업데이트를 위한 fetch 요청
		fetch("/", {
			method: "POST",
			body: new URLSearchParams({ theme: newTheme }),
		});
	};

	// 테마 클래스 관리
	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

	return (
		<html lang="ko" className={theme ?? ""}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-black dark:bg-black transition-colors duration-300">
				<Outlet context={{ theme, toggleTheme }} />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
