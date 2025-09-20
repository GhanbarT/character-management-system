'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCharacters, getCharactersByField } from '@/lib/mock-data';
import { BarChart3, BookOpen, Users } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

export function DashboardSummaryCards() {
  const t = useTranslations();
  const locale = useLocale();

  const totalCharacters = mockCharacters.length;
  const poetsCount = getCharactersByField('Poet').length;
  const philosophersCount = getCharactersByField('Philosopher').length;

  const formatNumber = (num: number) => new Intl.NumberFormat(locale).format(num);

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('dashboard.totalCharacters')}</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(totalCharacters)}</div>
          <p className="text-muted-foreground text-xs">{t('dashboard.registeredCharacters')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('fields.poet')}</CardTitle>
          <BookOpen className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(poetsCount)}</div>
          <p className="text-muted-foreground text-xs">{t('dashboard.largestCategory')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('fields.philosopher')}</CardTitle>
          <BarChart3 className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(philosophersCount)}</div>
          <p className="text-muted-foreground text-xs">{t('dashboard.secondCategory')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
