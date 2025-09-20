'use client';

import { CharacterDetail } from '@/app/[locale]/characters/components/character-detail';
import { CharacterForm } from '@/app/[locale]/characters/components/character-form';
import { CharacterTable } from '@/app/[locale]/characters/components/character-table';
import { mockCharacters } from '@/lib/mock-data';
import type { Character, CreateCharacterInput } from '@/lib/types';
import { useState } from 'react';

export default function CharactersPage() {
  const [characters] = useState<Character[]>(mockCharacters);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleView = (character: Character) => {
    setSelectedCharacter(character);
    setShowDetail(true);
  };

  const handleEdit = (character: Character) => {
    setEditingCharacter(character);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingCharacter(null);
    setShowForm(true);
  };

  const handleSubmit = (data: CreateCharacterInput) => {
    console.log('Submitting character data:', data);
    setShowForm(false);
    setEditingCharacter(null);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <CharacterTable
          characters={characters}
          onView={handleView}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />

        <CharacterForm
          character={editingCharacter}
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={handleSubmit}
        />

        <CharacterDetail
          character={selectedCharacter}
          open={showDetail}
          onOpenChange={setShowDetail}
        />
      </div>
    </div>
  );
}
