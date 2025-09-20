'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BirthCenturyBarChartProps {
  data: { century: string; count: number; percentage: string }[];
  selectedField: string;
}

export function BirthCenturyBarChart({ data, selectedField }: BirthCenturyBarChartProps) {
  const t = useTranslations('dashboard');
  const tFields = useTranslations('fields'); // For selectedField badge
  const tCenturies = useTranslations('centuries');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair flex items-center gap-2">
          <div className="bg-chart-2 h-3 w-3 rounded-full" />
          {t('barChartBirthCentury')}
        </CardTitle>
        <div className="flex gap-2">
          {selectedField !== 'all' && <Badge variant="secondary">{tFields(selectedField)}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="century"
              tickFormatter={(value) => tCenturies(value as string)}
              tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
            />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value) => [`${value} ${t('characters')}`, t('count')]}
              labelFormatter={(label) => tCenturies(label as string)}
            />
            <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
