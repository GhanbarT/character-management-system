'use client';

import { ActivityFieldSummaryGrid } from '@/app/[locale]/dashboard/components/activity-field-summary-grid';
import { BirthCenturyBarChart } from '@/app/[locale]/dashboard/components/birth-century-bar-chart';
import { DashboardControls } from '@/app/[locale]/dashboard/components/dashboard-controls';
import { DashboardMetricCards } from '@/app/[locale]/dashboard/components/dashboard-metric-cards';
import { FieldDistributionRadarChart } from '@/app/[locale]/dashboard/components/field-distribution-radar-chart';
import { PopularityRankingChart } from '@/app/[locale]/dashboard/components/popularity-ranking-chart';
import { getTranslatedValue } from '@/lib/getTranslatedValue'; // Ensure this is correctly implemented and imported
import { mockCharacters } from '@/lib/mock-data';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

const getCenturyTranslationKey = (year: number, tCenturies: ReturnType<typeof useTranslations>) => {
  if (year >= 900 && year < 1000) return tCenturies('century10');
  if (year >= 1000 && year < 1100) return tCenturies('century11');
  if (year >= 1100 && year < 1200) return tCenturies('century12');
  if (year >= 1200 && year < 1300) return tCenturies('century13');
  if (year >= 1300 && year < 1400) return tCenturies('century14');
  return tCenturies('unknown');
};

export function DashboardCharts() {
  const t = useTranslations();
  const tCenturies = useTranslations('centuries');

  const [selectedField, setSelectedField] = useState<string>('all');
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar');

  // Memoize data generation to prevent re-computation on every render
  const radarData = useMemo(() => {
    const fieldCounts = mockCharacters.reduce(
      (acc, char) => {
        const translatedField = char.fieldOfActivity; // Use original field name as key, translate for display in chart
        acc[translatedField] = (acc[translatedField] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const maxCount = Math.max(...Object.values(fieldCounts)) + 2; // +2 for padding
    return Object.entries(fieldCounts).map(([field, count]) => ({
      field,
      count,
      fullMark: maxCount,
    }));
  }, []);

  const birthDateData = useMemo(() => {
    const centuryCounts = mockCharacters.reduce(
      (acc, char) => {
        const year = Number.parseInt(char.birthDate);
        const centuryKey = getCenturyTranslationKey(year, tCenturies);
        acc[centuryKey] = (acc[centuryKey] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(centuryCounts).map(([century, count]) => ({
      century,
      count,
      percentage: ((count / mockCharacters.length) * 100).toFixed(1),
    }));
  }, [tCenturies]);

  const popularityData = useMemo(() => {
    return mockCharacters
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5)
      .map((char) => ({
        name: char.name.split(' ')[0], // First name only for chart readability
        likes: char.likes,
        field: getTranslatedValue(t, 'field', char.fieldOfActivity), // Translate field for tooltip
      }));
  }, [t]);

  const uniqueFields = useMemo(() => {
    return [...new Set(mockCharacters.map((char) => char.fieldOfActivity))];
  }, []);

  // Filtered data based on selectedField state
  const filteredRadarData = useMemo(() => {
    return selectedField === 'all'
      ? radarData
      : radarData.filter((item) => item.field === selectedField);
  }, [selectedField, radarData]);

  const filteredBirthData = useMemo(() => {
    return selectedField === 'all'
      ? birthDateData
      : birthDateData.filter((item) => {
          // Re-calculate century counts *for the selected field only*
          const charactersInSelectedField = mockCharacters.filter(
            (char) => char.fieldOfActivity === selectedField,
          );
          const fieldCenturyCounts = charactersInSelectedField.reduce(
            (acc, char) => {
              const year = Number.parseInt(char.birthDate);
              const centuryKey = getCenturyTranslationKey(year, tCenturies);
              acc[centuryKey] = (acc[centuryKey] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>,
          );
          return (fieldCenturyCounts[item.century] || 0) > 0;
        });
  }, [selectedField, birthDateData, tCenturies]);

  return (
    <div className="space-y-6">
      <DashboardControls
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        chartType={chartType}
        setChartType={setChartType}
        uniqueFields={uniqueFields}
      />
      <DashboardMetricCards
        uniqueFieldsCount={uniqueFields.length}
        popularityData={popularityData}
      />
      <div className="grid grid-cols-1 gap-6">
        {chartType === 'radar' && (
          <FieldDistributionRadarChart data={filteredRadarData} selectedField={selectedField} />
        )}
        {chartType === 'bar' && (
          <BirthCenturyBarChart data={filteredBirthData} selectedField={selectedField} />
        )}
      </div>
      <PopularityRankingChart data={popularityData} />
      <ActivityFieldSummaryGrid data={radarData} /> {/* Uses full radarData for the summary grid */}
    </div>
  );
}
