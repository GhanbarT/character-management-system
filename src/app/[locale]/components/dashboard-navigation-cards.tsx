'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export function DashboardNavigationCards() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t('characters.characterManagement')}</CardTitle>
          <CardDescription>{t('dashboard.characterManagementDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{t('dashboard.characterManagementDetails')}</p>
          <Link href={`/${locale}/characters`} passHref>
            <RippleButton>{t('dashboard.viewCharactersList')}</RippleButton>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">{t('dashboard.analyticalDashboard')}</CardTitle>
          <CardDescription>{t('dashboard.analyticalDashboardDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{t('dashboard.analyticalDashboardDetails')}</p>
          <Link href={`/${locale}/dashboard`} passHref>
            <RippleButton>{t('dashboard.viewAnalyticalDashboard')}</RippleButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
