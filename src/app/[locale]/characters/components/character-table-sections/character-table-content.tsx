'use client';

import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getTranslatedValue } from '@/lib/getTranslatedValue';
import type { Character } from '@/lib/types';
import { type ColumnDef, flexRender, type Table as ReactTableType } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Edit, Eye, MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

interface CharacterTableContentProps {
  table: ReactTableType<Character>;
  columns: ColumnDef<Character>[];
  onEdit?: (character: Character) => void;
  onView?: (character: Character) => void;
}

export function CharacterTableContent({
  table,
  columns,
  onEdit,
  onView,
}: CharacterTableContentProps) {
  const t = useTranslations();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sortableColumns = ['name', 'birthDate', 'deathDate', 'works', 'likes'];
                const isSortable = sortableColumns.includes(header.column.id as string);
                const sortDirection = header.column.getIsSorted();
                return (
                  <TableHead key={header.id} className="text-right">
                    {header.isPlaceholder ? null : isSortable ? (
                      <button
                        type="button"
                        className="hover:text-primary flex w-full items-center justify-end gap-1 text-right font-semibold focus:outline-none"
                        onClick={header.column.getToggleSortingHandler()}
                        aria-label={t('navigation.sortBy', {
                          column: String(t(`characters.${header.column.id}` as any)),
                        })}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="ml-1 flex flex-col">
                          <ChevronUp
                            className={`text-muted-foreground h-3 w-3 transition ${
                              sortDirection === 'asc' ? 'text-primary' : ''
                            }`}
                          />
                          <ChevronDown
                            className={`text-muted-foreground -mt-1 h-3 w-3 transition ${
                              sortDirection === 'desc' ? 'text-primary' : ''
                            }`}
                          />
                        </span>
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-right">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t('messages.noCharactersFound')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
