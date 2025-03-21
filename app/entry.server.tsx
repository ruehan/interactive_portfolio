/**
 * 서버 사이드 렌더링을 위한 엔트리 포인트
 * 스트리밍 SSR과 선택적 렌더링 최적화
 */

import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

// 캐시 헤더 설정 함수
function setCacheHeaders(responseHeaders: Headers, request: Request, routeId?: string): void {
	// 기본적으로 동적 콘텐츠로 간주 (캐시 없음)
	let cacheControl = "no-cache, no-store, must-revalidate";

	// 정적 애셋인 경우 장기 캐싱 설정
	if (routeId?.includes("_static") || request.url.includes("/build/") || request.url.includes("/assets/")) {
		cacheControl = "public, max-age=31536000, immutable";
	}
	// API 라우트인 경우 짧은 캐싱 설정
	else if (routeId?.includes("_api")) {
		cacheControl = "public, max-age=60";
	}
	// 일반 페이지에 대한 약간의 캐싱 설정
	else if (!routeId?.includes("_action") && !request.url.includes("/actions/")) {
		cacheControl = "public, max-age=300, stale-while-revalidate=604800";
	}

	responseHeaders.set("Cache-Control", cacheControl);
}

// 현재 라우트 ID 추출 함수
function getCurrentRouteId(remixContext: EntryContext): string | undefined {
	// 현재 라우트를 확인하는 안전한 방법
	if (remixContext.routeModules && Object.keys(remixContext.routeModules).length > 0) {
		const routeIds = Object.keys(remixContext.routeModules);
		return routeIds[routeIds.length - 1];
	}
	return undefined;
}

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_loadContext: AppLoadContext
) {
	// 라우트 ID에 따른 최적화 설정
	const routeId = getCurrentRouteId(remixContext);

	// 보안 헤더 설정
	responseHeaders.set("X-Content-Type-Options", "nosniff");
	responseHeaders.set("X-Frame-Options", "DENY");
	responseHeaders.set("X-XSS-Protection", "1; mode=block");
	responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

	// 캐시 헤더 설정
	setCacheHeaders(responseHeaders, request, routeId);

	return isbot(request.headers.get("user-agent") || "")
		? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
		: handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

function handleBotRequest(request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) {
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const { pipe, abort } = renderToPipeableStream(<RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />, {
			// 검색 엔진 크롤러를 위해 모든 콘텐츠가 렌더링될 때까지 대기
			onAllReady() {
				shellRendered = true;
				const body = new PassThrough();
				const stream = createReadableStreamFromReadable(body);

				responseHeaders.set("Content-Type", "text/html");

				resolve(
					new Response(stream, {
						headers: responseHeaders,
						status: responseStatusCode,
					})
				);

				pipe(body);
			},
			onShellError(error: unknown) {
				reject(error);
			},
			onError(error: unknown) {
				responseStatusCode = 500;
				if (shellRendered) {
					console.error(`🔴 서버 렌더링 오류 (봇) - ${error instanceof Error ? error.message : "Unknown error"}`);
				}
			},
		});

		setTimeout(abort, ABORT_DELAY);
	});
}

function handleBrowserRequest(request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext) {
	return new Promise((resolve, reject) => {
		let shellRendered = false;

		// 요청 URL에서 라우트 경로 추출
		const url = new URL(request.url);
		const path = url.pathname;

		const { pipe, abort } = renderToPipeableStream(<RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />, {
			// 쉘이 준비되면 즉시 스트리밍 시작 (Streaming SSR)
			onShellReady() {
				shellRendered = true;
				const body = new PassThrough();
				const stream = createReadableStreamFromReadable(body);

				responseHeaders.set("Content-Type", "text/html");

				// 라우트 기반 최적화 (Remix에서 실제 존재하는 라우트에만 프리로드 헤더 적용)
				if (path.startsWith("/projects")) {
					// 프로젝트 페이지일 경우에만 프리로드 설정
					responseHeaders.append("Link", `</projects>; rel=prefetch`);
				}

				resolve(
					new Response(stream, {
						headers: responseHeaders,
						status: responseStatusCode,
					})
				);

				pipe(body);
			},
			onShellError(error: unknown) {
				reject(error);
			},
			onError(error: unknown) {
				responseStatusCode = 500;
				if (shellRendered) {
					console.error(`🔴 서버 렌더링 오류 (브라우저) - ${error instanceof Error ? error.message : "Unknown error"}`);
				}
			},
		});

		setTimeout(abort, ABORT_DELAY);
	});
}
