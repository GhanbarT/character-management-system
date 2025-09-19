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
import { Card, CardContent } from '@/components/ui/card';
import { getTranslatedValue } from '@/lib/getTranslatedValue';
import type { Character } from '@/lib/types';
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Edit, Eye, MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useMemo, useState } from 'react';
import { CharacterTableContent } from './character-table-sections/character-table-content';
import { CharacterTablePagination } from './character-table-sections/character-table-pagination';
import { CharacterTableToolbar } from './character-table-sections/character-table-toolbar';

interface CharacterTableProps {
  characters: Character[];
  onEdit?: (character: Character) => void;
  onView?: (character: Character) => void;
  onAdd?: () => void;
}

export function CharacterTable({ characters, onEdit, onView, onAdd }: CharacterTableProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'avatar',
        header: t('characters.image'),
        cell: ({ row }: any) => (
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={row.getValue('avatar') || '/placeholder.svg'}
              alt={row.getValue('name')}
            />
            <AvatarFallback>{(row.getValue('name') as string).charAt(0)}</AvatarFallback>
          </Avatar>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: t('characters.name'),
        cell: ({ row }: any) => <div className="font-medium">{row.getValue('name')}</div>,
        enableSorting: true,
      },
      {
        accessorKey: 'gender',
        header: t('characters.gender'),
        cell: ({ row }: any) => {
          const gender = row.getValue('gender') as string;
          return <Badge variant="outline">{getTranslatedValue(t, 'gender', gender)}</Badge>;
        },
      },
      {
        accessorKey: 'birthDate',
        header: t('characters.birthDate'),
        cell: ({ row }: any) => {
          const birthDate = row.getValue('birthDate');
          return (
            <div className="text-sm">
              {new Intl.NumberFormat(locale, { useGrouping: false }).format(Number(birthDate))}
            </div>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: 'deathDate',
        header: t('characters.deathDate'),
        cell: ({ row }: any) => {
          const deathDate = row.getValue('deathDate');
          const display = deathDate || t('centuries.unknown');
          // Only format if display is a number
          return (
            <div className="text-sm">
              {isNaN(Number(display))
                ? display
                : new Intl.NumberFormat(locale, { useGrouping: false }).format(Number(display))}
            </div>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: 'fieldOfActivity',
        header: t('characters.fieldOfActivity'),
        cell: ({ row }: any) => {
          const field = row.getValue('fieldOfActivity') as string;
          return <Badge variant="secondary">{getTranslatedValue(t, 'field', field)}</Badge>;
        },
      },
      {
        accessorKey: 'works',
        header: t('characters.works'),
        cell: ({ row }: any) => {
          const works = row.getValue('works') as string[];
          const count = works.length;
          return (
            <RippleButton
              variant="link"
              className="text-primary h-auto p-0"
              onClick={() => onView?.(row.original)}
            >
              {t('characters.worksCount', {
                count: new Intl.NumberFormat(locale, { useGrouping: false }).format(count),
              })}
            </RippleButton>
          );
        },
        enableSorting: true,
        sortingFn: (rowA: any, rowB: any, columnId: string) => {
          const a = rowA.getValue(columnId) as string[];
          const b = rowB.getValue(columnId) as string[];
          return a.length - b.length;
        },
      },
      {
        accessorKey: 'status',
        header: t('characters.status'),
        cell: ({ row }: any) => {
          const status = row.getValue('status') as string;
          return (
            <Badge variant={status === 'Active' ? 'default' : 'secondary'}>
              {getTranslatedValue(t, 'status', status)}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'likes',
        header: t('characters.likes'),
        cell: ({ row }: any) => {
          const likes = row.getValue('likes');
          return (
            <div className="text-center font-medium">
              {new Intl.NumberFormat(locale, { useGrouping: false }).format(Number(likes))}
            </div>
          );
        },
        enableSorting: true,
      },
      {
        id: 'actions',
        header: t('characters.actions'),
        cell: ({ row }: any) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <RippleButton variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </RippleButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onView?.(row.original)}>
                <Eye className="mr-2 h-4 w-4" />
                {t('characters.viewDetails')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
                <Edit className="mr-2 h-4 w-4" />
                {t('navigation.edit')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onView, t, locale],
  );

  const table = useReactTable({
    data: characters,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <Card>
      <CharacterTableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onAdd={onAdd}
      />
      <CardContent>
        <CharacterTableContent table={table} columns={columns} onEdit={onEdit} onView={onView} />
        <CharacterTablePagination table={table} />
      </CardContent>
    </Card>
  );
}
