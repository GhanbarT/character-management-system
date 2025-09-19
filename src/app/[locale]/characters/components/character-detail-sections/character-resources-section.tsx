'use client';

import { FileText, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

interface CharacterResourcesSectionProps {
  textResources: string[];
  audioResources: string[];
}

export function CharacterResourcesSection({
  textResources,
  audioResources,
}: CharacterResourcesSectionProps) {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair text-lg">{t('navigation.resources')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Resources */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-medium">
            <FileText className="h-4 w-4" />
            {t('upload.textFiles')} ({textResources.length})
          </h4>
          {textResources.length > 0 ? (
            <ul className="space-y-2">
              {textResources.map((resource, index) => (
                <li key={index} className="text-muted-foreground truncate text-sm">
                  {resource}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">{t('messages.noTextResourcesFound')}</p>
          )}
        </div>

        <Separator />

        {/* Audio Resources */}
        <div>
          <h4 className="mb-3 flex items-center gap-2 font-medium">
            <Music className="h-4 w-4" />
            {t('upload.audioFiles')} ({audioResources.length})
          </h4>
          {audioResources.length > 0 ? (
            <ul className="space-y-2">
              {audioResources.map((resource, index) => (
                <li key={index} className="text-muted-foreground truncate text-sm">
                  {resource}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">{t('messages.noAudioResourcesFound')}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
