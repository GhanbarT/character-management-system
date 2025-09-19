'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RippleButton } from '@/components/animate-ui/components/buttons/ripple';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockCharacters } from '@/lib/mock-data';
import type { Character } from '@/lib/types';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Edit, Eye, MoreHorizontal, Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl'; // Removed useLocale as t() handles it
import { useMemo, useState } from 'react';

interface CharacterTableProps {
  onEdit?: (character: Character) => void;
  onView?: (character: Character) => void;
  onAdd?: () => void;
}

export function CharacterTable({ onEdit, onView, onAdd }: CharacterTableProps) {
  const t = useTranslations(); // Initialize useTranslations
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  // Helper to get translated gender/field/status from schema's English values
  const getTranslatedValue = (type: 'gender' | 'field' | 'status', value: string) => {
    if (type === 'gender') {
      // Map 'Male' to 'characters.male', 'Female' to 'characters.female'
      return t(`characters.${value.toLowerCase()}`);
    }
    if (type === 'field') {
      // Map 'Poet' to 'fields.poet', etc.
      return t(`fields.${value.toLowerCase()}`);
    }
    if (type === 'status') {
      // Map 'Active' to 'characters.active', 'Inactive' to 'characters.inactive'
      return t(`characters.${value.toLowerCase()}`);
    }
    return value; // Fallback
  };

  const columns: ColumnDef<Character>[] = useMemo(
    () => [
      {
        accessorKey: 'avatar',
        header: t('characters.image'), // Use translation key
        cell: ({ row }) => (
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
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
      },
      {
        accessorKey: 'gender',
        header: t('characters.gender'),
        cell: ({ row }) => {
          const gender = row.getValue('gender') as string; // Will be 'Male' or 'Female'
          return <Badge variant="outline">{getTranslatedValue('gender', gender)}</Badge>;
        },
      },
      {
        accessorKey: 'birthDate',
        header: t('characters.birthDate'),
        cell: ({ row }) => <div className="text-sm">{row.getValue('birthDate')}</div>,
      },
      {
        accessorKey: 'deathDate',
        header: t('characters.deathDate'),
        cell: ({ row }) => {
          const deathDate = row.getValue('deathDate') as string;
          return <div className="text-sm">{deathDate || t('centuries.unknown')}</div>;
        },
      },
      {
        accessorKey: 'fieldOfActivity',
        header: t('characters.fieldOfActivity'),
        cell: ({ row }) => {
          const field = row.getValue('fieldOfActivity') as string; // Will be 'Poet', 'Writer', etc.
          return <Badge variant="secondary">{getTranslatedValue('field', field)}</Badge>;
        },
      },
      {
        accessorKey: 'works',
        header: t('characters.works'),
        cell: ({ row }) => {
          const works = row.getValue('works') as string[];
          return (
            <RippleButton
              variant="link"
              className="text-primary h-auto p-0"
              onClick={() => onView?.(row.original)}
            >
              {t('characters.worksCount', { count: works.length })}{' '}
              {/* Use worksCount with interpolation */}
            </RippleButton>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'status',
        header: t('characters.status'),
        cell: ({ row }) => {
          const status = row.getValue('status') as string; // Will be 'Active' or 'Inactive'
          return (
            <Badge variant={status === 'Active' ? 'default' : 'secondary'}>
              {getTranslatedValue('status', status)}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'likes',
        header: t('characters.likes'),
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue('likes')}</div>,
      },
      {
        id: 'actions',
        header: t('characters.actions'),
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <RippleButton variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </RippleButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
    [getTranslatedValue, onEdit, onView, t],
  );

  const table = useReactTable({
    data: mockCharacters,
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
              placeholder={t('search.charactersPlaceholder')} // Use translation key
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-right">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
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

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-muted-foreground text-sm">
            {t('pagination.showingResults', {
              start:
                table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
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
      </CardContent>
    </Card>
  );
}
