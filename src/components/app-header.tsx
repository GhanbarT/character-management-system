'use client';

import { Button } from '@/components/animate-ui/components/buttons/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { BookOpen, Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

interface AppHeaderProps {
  showNavigation?: boolean;
}

export function AppHeader({ showNavigation = true }: AppHeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = locale === 'fa';

  const navigationItems = [
    { label: t('navigation.dashboard'), href: `/${locale}/dashboard` },
    { label: t('navigation.characters'), href: `/${locale}/characters` },
  ];

  return (
    <header className="bg-card/50 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary h-8 w-8" />
            <h1 className="text-primary font-playfair text-xl font-bold md:text-2xl">
              {t('navigation.title')}
            </h1>
          </div>

          {/* Desktop Navigation */}
          {showNavigation && (
            <nav className="hidden items-center gap-4 md:flex">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className="text-sm">
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />

            {/* Mobile Menu Button */}
            {showNavigation && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {showNavigation && mobileMenuOpen && (
          <nav className="mt-4 border-t pt-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className={cn('justify-start', isRTL && 'justify-end')}>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
