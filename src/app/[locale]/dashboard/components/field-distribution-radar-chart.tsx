'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface FieldDistributionRadarChartProps {
  data: { field: string; count: number; fullMark: number }[];
  selectedField: string;
}

export function FieldDistributionRadarChart({
  data,
  selectedField,
}: FieldDistributionRadarChartProps) {
  const t = useTranslations('dashboard');
  const tFields = useTranslations('fields');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair flex items-center gap-2">
          <div className="bg-primary h-3 w-3 rounded-full" />
          {t('radarChartDistribution')}
        </CardTitle>
        <div className="flex gap-2">
          {selectedField !== 'all' && (
            <Badge variant="secondary">{tFields(selectedField.toLowerCase())}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="field"
              tickFormatter={(value: string) => tFields(value.toLowerCase())} // Translate field names
              tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 'dataMax']}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Radar
              name={t('characterCount')}
              dataKey="count"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelFormatter={(label: string) => tFields(label.toLowerCase())}
              formatter={(value) => [`${value} ${t('characters')}`, t('count')]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
