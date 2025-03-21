import { useEffect, useState, type ReactNode } from "react";

interface ClientOnlyProps {
	children: ReactNode | (() => ReactNode);
	fallback?: ReactNode;
}

/**
 * 클라이언트 사이드에서만 렌더링되어야 하는 컴포넌트를 래핑하는 유틸리티 컴포넌트입니다.
 * Three.js와 같은 브라우저 API에 의존하는 컴포넌트를 SSR 중에 오류 없이 렌더링할 수 있게 해줍니다.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// children이 함수인 경우 실행
	if (isClient) {
		return typeof children === "function" ? <>{children()}</> : <>{children}</>;
	}

	return <>{fallback}</>;
}
