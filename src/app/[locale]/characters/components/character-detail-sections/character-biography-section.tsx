'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

interface CharacterBiographySectionProps {
  biography?: string;
}

export function CharacterBiographySection({ biography }: CharacterBiographySectionProps) {
  const t = useTranslations();

  if (!biography) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">{t('characters.biography')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{biography}</p>
      </CardContent>
    </Card>
  );
}
