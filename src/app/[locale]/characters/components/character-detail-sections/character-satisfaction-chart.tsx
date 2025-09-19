'use client';

import { Progress } from '@/components/animate-ui/components/radix/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface CharacterSatisfactionChartProps {
  likes: number;
}

const MAX_LIKE = 300;

export function CharacterSatisfactionChart({ likes }: CharacterSatisfactionChartProps) {
  const t = useTranslations();
  const satisfactionPercentage = Math.min((likes / MAX_LIKE) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">
          {t('dashboard.userSatisfactionChart')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('dashboard.popularityLevel')}</span>
            <span className="text-muted-foreground text-sm">
              {satisfactionPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress value={satisfactionPercentage} className="h-3" />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>{t('dashboard.low')}</span>
            <span>{t('dashboard.medium')}</span>
            <span>{t('dashboard.high')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
