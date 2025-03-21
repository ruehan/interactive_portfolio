/**
 * 서버 사이드 렌더링을 위한 엔트리 포인트
 * 스트리밍 SSR과 선택적 렌더링 최적화
 */

import { PassThrough } from 'node:stream';

import type { AppLoadContext, EntryContext } from '@remix-run/node';
import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';

const ABORT_DELAY = 5_000;

function setCacheHeaders(responseHeaders: Headers, request: Request, routeId?: string): void {
  let cacheControl = 'no-cache, no-store, must-revalidate';

  if (routeId?.includes('_static') || request.url.includes('/build/') || request.url.includes('/assets/')) {
    cacheControl = 'public, max-age=31536000, immutable';
  } else if (routeId?.includes('_api')) {
    cacheControl = 'public, max-age=60';
  } else if (!routeId?.includes('_action') && !request.url.includes('/actions/')) {
    cacheControl = 'public, max-age=300, stale-while-revalidate=604800';
  }

  responseHeaders.set('Cache-Control', cacheControl);
}

function getCurrentRouteId(remixContext: EntryContext): string | undefined {
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
  _loadContext: AppLoadContext,
) {
  const routeId = getCurrentRouteId(remixContext);

  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  responseHeaders.set('X-Frame-Options', 'DENY');
  responseHeaders.set('X-XSS-Protection', '1; mode=block');
  responseHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  setCacheHeaders(responseHeaders, request, routeId);

  return isbot(request.headers.get('user-agent') || '')
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext);
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(`🔴 서버 렌더링 오류 (봇) - ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const url = new URL(request.url);
    const path = url.pathname;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          if (path.startsWith('/projects')) {
            responseHeaders.append('Link', `</projects>; rel=prefetch`);
          }

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(
              `🔴 서버 렌더링 오류 (브라우저) - ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
