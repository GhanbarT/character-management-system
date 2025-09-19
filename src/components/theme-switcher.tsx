'use client';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/animate-ui/primitives/radix/dropdown-menu';
import { Laptop2, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('theme');

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-md px-2 py-2 text-sm"
          aria-label={t('theme')}
        >
          {theme === 'dark' ? (
            <Moon className="h-4 w-4" />
          ) : theme === 'light' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Laptop2 className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem
          onSelect={() => setTheme('light')}
          className="flex cursor-pointer items-center gap-2"
        >
          <Sun className="h-4 w-4" /> {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setTheme('dark')}
          className="flex cursor-pointer items-center gap-2"
        >
          <Moon className="h-4 w-4" /> {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setTheme('system')}
          className="flex cursor-pointer items-center gap-2"
        >
          <Laptop2 className="h-4 w-4" /> {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
