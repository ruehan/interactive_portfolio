/**
 * 클라이언트 사이드 하이드레이션을 위한 엔트리 포인트
 * React 18+의 Concurrent 모드와 Suspense 기능을 활용하여 최적화
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// 성능 메트릭 측정 함수
function collectMetrics() {
	// Web Vitals 측정을 위한 Performance API 사용
	if (typeof window.performance?.getEntriesByType !== "function") return;

	// FCP(First Contentful Paint) 측정
	const paintEntries = performance.getEntriesByType("paint");
	const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint");

	if (fcpEntry) {
		console.info(`⚡ FCP: ${Math.round(fcpEntry.startTime)}ms`);
	}

	// LCP(Largest Contentful Paint) 측정을 위한 PerformanceObserver 설정
	if ("PerformanceObserver" in window) {
		const lcpObserver = new PerformanceObserver((entryList) => {
			const entries = entryList.getEntries();
			const lastEntry = entries[entries.length - 1];
			console.info(`⚡ LCP: ${Math.round(lastEntry.startTime)}ms`);
		});

		lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
	}
}

// 하이드레이션 전 초기화 작업
function prepareApp() {
	// 중요: 브라우저 접두사에 대응하기 위한 자동 접두사 추가
	if (typeof document !== "undefined") {
		document.documentElement.dataset.hydrated = "false";
	}
}

// 하이드레이션 후 후처리 작업
function postHydrationTasks() {
	requestIdleCallback(() => {
		// 하이드레이션이 완료됨을 표시
		if (typeof document !== "undefined") {
			document.documentElement.dataset.hydrated = "true";
		}

		// 성능 메트릭 수집
		collectMetrics();

		// 프리패치 초기화 - 방문 가능성이 높은 링크 미리 로드
		initPrefetching();
	});
}

// 프리패치 초기화 함수
function initPrefetching() {
	// IntersectionObserver를 사용하여 뷰포트에 들어오는 링크 감지
	if ("IntersectionObserver" in window) {
		const prefetchObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const link = entry.target as HTMLAnchorElement;
						const prefetchLink = document.createElement("link");
						prefetchLink.rel = "prefetch";
						prefetchLink.href = link.href;
						document.head.appendChild(prefetchLink);
						prefetchObserver.unobserve(link);
					}
				});
			},
			{ rootMargin: "200px" }
		);

		// 모든 내부 링크 관찰
		setTimeout(() => {
			document.querySelectorAll('a[href^="/"]').forEach((link) => {
				prefetchObserver.observe(link);
			});
		}, 1000);
	}
}

// 앱 초기화
prepareApp();

// React 18의 Concurrent 모드를 활용한 하이드레이션
startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<RemixBrowser />
		</StrictMode>
	);

	// 하이드레이션 후 작업 실행
	postHydrationTasks();
});
