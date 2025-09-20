'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface PopularityRankingChartProps {
  data: { name: string; likes: number; field: string }[];
}

export function PopularityRankingChart({ data }: PopularityRankingChartProps) {
  const t = useTranslations('dashboard');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair flex items-center gap-2">
          <div className="bg-chart-3 h-3 w-3 rounded-full" />
          {t('popularityRankingChartTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value, name, props) => [
                `${value} ${t('likes')}`,
                `${props.payload.field}`,
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="likes" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
