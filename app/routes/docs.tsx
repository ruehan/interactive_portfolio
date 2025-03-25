'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function DocsPage() {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch('/docs/project-documentation.md')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.error('마크다운 파일을 불러오는데 실패했습니다:', error));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
      </article>
    </div>
  );
}
