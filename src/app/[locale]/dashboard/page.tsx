'use client';

import { DashboardCharts } from '@/app/[locale]/dashboard/components/dashboard-charts';

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <DashboardCharts />
      </main>
    </div>
  );
}
