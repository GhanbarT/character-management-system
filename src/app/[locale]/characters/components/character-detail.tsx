'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/animate-ui/components/radix/dialog';
import type { Character } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { CharacterBiographySection } from './character-detail-sections/character-biography-section';
import { CharacterHeader } from './character-detail-sections/character-header';
import { CharacterResourcesSection } from './character-detail-sections/character-resources-section';
import { CharacterSatisfactionChart } from './character-detail-sections/character-satisfaction-chart';
import { CharacterWorksSection } from './character-detail-sections/character-works-section';

interface CharacterDetailProps {
  character: Character | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharacterDetail({ character, open, onOpenChange }: CharacterDetailProps) {
  const t = useTranslations();

  if (!character) return null;

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
          <CharacterHeader character={character} />

          <CharacterBiographySection biography={character.biography} />

          <CharacterSatisfactionChart likes={character.likes} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CharacterWorksSection works={character.works} />
            <CharacterResourcesSection
              textResources={character.textResources}
              audioResources={character.audioResources}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
