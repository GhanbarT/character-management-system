'use client';

import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface CharacterWorksSectionProps {
  works: string[];
}

export function CharacterWorksSection({ works }: CharacterWorksSectionProps) {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5" />
          {t('characters.worksCount', { count: works.length })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {works.length > 0 ? (
          <ul className="space-y-3">
            {works.map((work, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-primary mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" />
                <span className="text-sm">{work}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">{t('messages.noWorksFound')}</p>
        )}
      </CardContent>
    </Card>
  );
}
