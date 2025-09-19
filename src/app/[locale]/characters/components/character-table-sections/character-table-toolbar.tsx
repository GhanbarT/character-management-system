'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

interface CharacterTableToolbarProps {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  onAdd?: () => void;
}

export function CharacterTableToolbar({
  globalFilter,
  setGlobalFilter,
  onAdd,
}: CharacterTableToolbarProps) {
  const t = useTranslations();

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="font-playfair">{t('characters.characterManagement')}</CardTitle>
        <RippleButton onClick={onAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('characters.addNewCharacter')}
        </RippleButton>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder={t('search.charactersPlaceholder')}
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="pl-10"
          />
        </div>
      </div>
    </CardHeader>
  );
}
