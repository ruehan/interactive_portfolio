/**
 * 클라이언트 사이드 하이드레이션을 위한 엔트리 포인트
 * React 18+의 Concurrent 모드와 Suspense 기능을 활용하여 최적화
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

function collectMetrics() {
  if (typeof window.performance?.getEntriesByType !== 'function') return;

  const paintEntries = performance.getEntriesByType('paint');
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');

  if (fcpEntry) {
    console.info(`⚡ FCP: ${Math.round(fcpEntry.startTime)}ms`);
  }

  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver(entryList => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.info(`⚡ LCP: ${Math.round(lastEntry.startTime)}ms`);
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  }
}

function prepareApp() {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.hydrated = 'false';
  }
}

function postHydrationTasks() {
  requestIdleCallback(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.hydrated = 'true';
    }

    collectMetrics();

    initPrefetching();
  });
}

function initPrefetching() {
  if ('IntersectionObserver' in window) {
    const prefetchObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
            prefetchObserver.unobserve(link);
          }
        });
      },
      { rootMargin: '200px' },
    );

    setTimeout(() => {
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        prefetchObserver.observe(link);
      });
    }, 1000);
  }
}

prepareApp();

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );

  postHydrationTasks();
});
