'use client';

import { Button } from '@/components/animate-ui/components/buttons/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import React from 'react';

interface DashboardControlsProps {
  selectedField: string;
  setSelectedField: (field: string) => void;
  chartType: 'radar' | 'bar';
  setChartType: (type: 'radar' | 'bar') => void;
  uniqueFields: string[];
}

export function DashboardControls({
  selectedField,
  setSelectedField,
  chartType,
  setChartType,
  uniqueFields,
}: DashboardControlsProps) {
  const t = useTranslations('dashboard');
  const tFields = useTranslations('fields');

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h2 className="font-playfair text-3xl font-bold">{t('analyticalDashboard')}</h2>
        <p className="text-muted-foreground">{t('analyticalDashboardDescription')}</p>
      </div>

      <div className="flex gap-2">
        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t('selectFieldOfActivity')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allFields')}</SelectItem>
            {uniqueFields.map((field) => (
              <SelectItem key={field} value={field}>
                {tFields(field.toLowerCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant={chartType === 'radar' ? 'default' : 'outline'}
          onClick={() => setChartType('radar')}
          size="sm"
        >
          {t('radarChart')}
        </Button>
        <Button
          variant={chartType === 'bar' ? 'default' : 'outline'}
          onClick={() => setChartType('bar')}
          size="sm"
        >
          {t('barChart')}
        </Button>
      </div>
    </div>
  );
}
