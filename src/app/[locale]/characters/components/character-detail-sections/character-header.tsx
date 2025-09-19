'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getTranslatedValue } from '@/lib/getTranslatedValue'; // Assuming this is correctly defined
import type { Character } from '@/lib/types';
import { Activity, BookOpen, Calendar, Heart, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CharacterHeaderProps {
  character: Character;
}

export function CharacterHeader({ character }: CharacterHeaderProps) {
  const t = useTranslations();
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
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
              <h2 className="font-playfair text-2xl font-bold sm:text-3xl">{character.name}</h2>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant="secondary" className="gap-1">
                  <User className="h-3 w-3" />
                  {getTranslatedValue(t, 'gender', character.gender)}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <BookOpen className="h-3 w-3" />
                  {getTranslatedValue(t, 'field', character.fieldOfActivity)}
                </Badge>
                <Badge
                  variant={character.status === 'Active' ? 'default' : 'secondary'}
                  className="gap-1"
                >
                  <Activity className="h-3 w-3" />
                  {getTranslatedValue(t, 'status', character.status)}
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
  );
}
