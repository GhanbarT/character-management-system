import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import type React from 'react';

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-red-500 md:text-8xl">404</h1>
      <h2 className="mb-6 text-center text-2xl font-semibold md:text-4xl">{t('title')}</h2>
      <p className="mb-8 max-w-md text-center text-lg md:text-xl">{t('description')}</p>
      <Link href="/" passHref>
        <RippleButton className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-blue-700">
          {t('backHome')}
        </RippleButton>
      </Link>
    </div>
  );
}
