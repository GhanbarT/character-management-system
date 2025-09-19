'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import type { Character } from '@/lib/types';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import React from 'react';

interface CharacterTablePaginationProps {
  table: ReactTableType<Character>;
}

export function CharacterTablePagination({ table }: CharacterTablePaginationProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-muted-foreground text-sm">
        {t('pagination.showingResults', {
          start: table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
          end: Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          ),
          total: table.getFilteredRowModel().rows.length,
        })}
      </div>
      <div className="space-x-2">
        <RippleButton
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t('navigation.previous')}
        </RippleButton>
        <RippleButton
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t('navigation.next')}
        </RippleButton>
      </div>
    </div>
  );
}
