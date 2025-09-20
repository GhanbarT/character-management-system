'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCharacters } from '@/lib/mock-data';
import { useTranslations } from 'next-intl';
import React from 'react';

interface ActivityFieldSummaryGridProps {
  data: { field: string; count: number; fullMark: number }[];
}

export function ActivityFieldSummaryGrid({ data }: ActivityFieldSummaryGridProps) {
  const t = useTranslations('dashboard');
  const tFields = useTranslations('fields');

  const totalCharacters = mockCharacters.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair">{t('activityFieldDistributionSummary')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {data.map((item) => (
            <div key={item.field} className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-primary mb-1 text-2xl font-bold">{item.count}</div>
              <div className="mb-2 text-sm font-medium">{tFields(item.field.toLowerCase())}</div>
              <div className="text-muted-foreground text-xs">
                {((item.count / totalCharacters) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
