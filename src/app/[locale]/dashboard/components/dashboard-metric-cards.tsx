'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCharacters } from '@/lib/mock-data';
import { BookOpen, Filter, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface DashboardMetricCardsProps {
  uniqueFieldsCount: number;
  popularityData: { name: string; likes: number; field: string }[];
}

export function DashboardMetricCards({
  uniqueFieldsCount,
  popularityData,
}: DashboardMetricCardsProps) {
  const t = useTranslations('dashboard');

  const totalCharacters = mockCharacters.length;
  const averageLikes =
    mockCharacters.reduce((sum, char) => sum + char.likes, 0) / (totalCharacters || 1); // Avoid division by zero

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('totalCharacters')}</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCharacters}</div>
          <p className="text-muted-foreground text-xs">{t('registeredCharacters')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('mostPopular')}</CardTitle>
          <TrendingUp className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{popularityData[0]?.likes || 0}</div>
          <p className="text-muted-foreground text-xs">{popularityData[0]?.name || t('noData')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('fieldsOfActivity')}</CardTitle>
          <BookOpen className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueFieldsCount}</div>
          <p className="text-muted-foreground text-xs">{t('largestCategory')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('averageLikes')}</CardTitle>
          <Filter className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(averageLikes)}</div>
          <p className="text-muted-foreground text-xs">{t('likesPerCharacter')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
