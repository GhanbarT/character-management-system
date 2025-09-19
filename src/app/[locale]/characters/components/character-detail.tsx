'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/animate-ui/components/radix/dialog';
import { Progress } from '@/components/animate-ui/components/radix/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Character } from '@/lib/types';
import { Activity, BookOpen, Calendar, FileText, Heart, Music, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const MAX_LIKE = 300;

interface CharacterDetailProps {
  character: Character | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharacterDetail({ character, open, onOpenChange }: CharacterDetailProps) {
  const t = useTranslations();
  const [liked, setLiked] = useState(false);

  if (!character) return null;

  const satisfactionPercentage = Math.min((character.likes / MAX_LIKE) * 100, 100);
  const handleLike = () => {
    setLiked(!liked);
  };

  // Helper to get translated gender/field/status from schema's English values
  const getTranslatedValue = (type: 'gender' | 'field' | 'status', value: string) => {
    if (type === 'gender') {
      return t(`characters.${value.toLowerCase()}`);
    }
    if (type === 'field') {
      return t(`fields.${value.toLowerCase()}`);
    }
    if (type === 'status') {
      return t(`characters.${value.toLowerCase()}`);
    }
    return value; // Fallback
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-xl overflow-y-auto p-4 sm:p-6 md:max-w-3xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="font-playfair text-xl sm:text-2xl">
            {t('characters.characterDetails')}
          </DialogTitle>
          <DialogDescription className="text-sm">{t('auth.enterCharacterInfo')}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Card — Avatar + Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <Avatar className="h-24 w-24 flex-shrink-0">
                  <AvatarImage
                    src={character.avatar || '/placeholder.svg'}
                    alt={character.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    {character.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div>
                    <h2 className="font-playfair text-2xl font-bold sm:text-3xl">
                      {character.name}
                    </h2>
                    <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                      <Badge variant="secondary" className="gap-1">
                        <User className="h-3 w-3" />
                        {getTranslatedValue('gender', character.gender)}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <BookOpen className="h-3 w-3" />
                        {getTranslatedValue('field', character.fieldOfActivity)}
                      </Badge>
                      <Badge
                        variant={character.status === 'Active' ? 'default' : 'secondary'}
                        className="gap-1"
                      >
                        <Activity className="h-3 w-3" />
                        {getTranslatedValue('status', character.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-muted-foreground flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:justify-start">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t('characters.birthDate')}: {character.birthDate}
                      </span>
                    </div>
                    {character.deathDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {t('characters.deathDate')}: {character.deathDate}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center sm:justify-start">
                    <RippleButton
                      variant={liked ? 'default' : 'outline'}
                      size="sm"
                      onClick={handleLike}
                      className="gap-2"
                    >
                      <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                      {t('characters.likes')} {character.likes + (liked ? 1 : 0)}
                    </RippleButton>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biography */}
          {character.biography && (
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-lg">{t('characters.biography')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{character.biography}</p>
              </CardContent>
            </Card>
          )}

          {/* Satisfaction Chart */}
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

          {/* Works & Resources — Responsive Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Works */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  {t('characters.worksCount', { count: character.works.length })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {character.works.length > 0 ? (
                  <ul className="space-y-3">
                    {character.works.map((work, index) => (
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

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-lg">{t('navigation.resources')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Text Resources */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-medium">
                    <FileText className="h-4 w-4" />
                    {t('upload.textFiles')} ({character.textResources.length})
                  </h4>
                  {character.textResources.length > 0 ? (
                    <ul className="space-y-2">
                      {character.textResources.map((resource, index) => (
                        <li key={index} className="text-muted-foreground truncate text-sm">
                          {resource}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {t('messages.noTextResourcesFound')}
                    </p>
                  )}
                </div>

                <Separator />

                {/* Audio Resources */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-medium">
                    <Music className="h-4 w-4" />
                    {t('upload.audioFiles')} ({character.audioResources.length})
                  </h4>
                  {character.audioResources.length > 0 ? (
                    <ul className="space-y-2">
                      {character.audioResources.map((resource, index) => (
                        <li key={index} className="text-muted-foreground truncate text-sm">
                          {resource}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      {t('messages.noAudioResourcesFound')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
