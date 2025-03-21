import { json } from '@remix-run/node';
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { ActionFunctionArgs, HeadersFunction, MetaFunction } from '@remix-run/node';
import ContactForm from '~/components/ContactForm';
import SocialLinks from '~/components/SocialLinks';
import { validateContactForm } from '~/utils/validation.server';
import { sendEmail } from '~/utils/email.server';

export const meta: MetaFunction = () => {
  return [
    { title: '연락하기 | 한규 포트폴리오' },
    { name: 'description', content: '한규에게 연락하기. 이메일, 소셜 미디어 또는 연락 양식을 통해 연락하세요.' },
  ];
};

export const loader = async () => {
  const username = 'ruehan'; // GitHub 사용자명

  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();

    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public`);
    const eventsData = await eventsResponse.json();

    console.log(eventsData);

    const isError = eventsData && eventsData.message && eventsData.documentation_url;

    const recentEvents =
      Array.isArray(eventsData) && !isError
        ? eventsData
            .slice(0, 5)
            .map((event: { id: string; type: string; repo: { name: string }; created_at: string }) => ({
              id: event.id,
              type: event.type,
              repo: event.repo.name,
              createdAt: event.created_at,
              // eslint-disable-next-line no-mixed-spaces-and-tabs
            }))
        : [];

    if (isError) {
      console.warn('GitHub API 속도 제한 초과:', eventsData.message);
    }

    return json({
      github: {
        user: {
          name: userData?.name || username,
          avatar: userData?.avatar_url || '',
          url: userData?.html_url || `https://github.com/${username}`,
          bio: userData?.bio || '풀스택 개발자',
        },
        recentActivity: recentEvents,
      },
    });
  } catch (error) {
    console.error('GitHub API 요청 실패:', error);
    return json({
      github: {
        user: {
          name: '한규',
          avatar: 'https://avatars.githubusercontent.com/u/65541546?v=4',
          url: 'https://github.com/ruehan',
          bio: '풀스택 개발자',
        },
        recentActivity: [],
      },
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const errors = validateContactForm({ name, email, subject, message });

  if (Object.keys(errors).length > 0) {
    return json({ errors, success: false }, { status: 400 });
  }

  try {
    await sendEmail({ name, email, subject, message });

    return json({ success: true, errors: {} as Record<string, string> }, { status: 200 });
  } catch (error) {
    console.error('이메일 발송 오류:', error);
    return json(
      {
        success: false,
        errors: {
          server: '이메일 발송 중 오류가 발생했습니다. 나중에 다시 시도하거나 직접 연락해 주세요.',
        },
      },
      { status: 500 },
    );
  }
};

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=300, s-maxage=3600',
    'Content-Security-Policy':
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' data: https: blob:; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self' https://api.github.com; " +
      "frame-src 'self'; " +
      "object-src 'none'; " +
      "base-uri 'self'",
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
};

export default function Contact() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (actionData?.success) {
      setFormSubmitted(true);
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-8 text-center">연락하기</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 연락 양식 섹션 */}
          <div className="w-full">
            <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg h-full">
              <h2 className="text-2xl font-semibold mb-4">메시지 보내기</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                궁금하신 점이나 문의사항이 있으면 메시지를 남겨주세요.
              </p>
              <ContactForm errors={actionData?.errors} isSubmitting={isSubmitting} success={formSubmitted} />
            </div>
          </div>

          {/* GitHub 활동 */}
          <div className="w-full">
            <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg h-full">
              <h2 className="text-2xl font-semibold mb-4">GitHub 활동</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">최근 GitHub에서의 개발 활동 내역입니다.</p>
              <SocialLinks githubData={loaderData.github} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
