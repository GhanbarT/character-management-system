'use client';

import { AuthForm } from '@/app/[locale]/components/auth-form';
import { DashboardNavigationCards } from '@/app/[locale]/components/dashboard-navigation-cards';
import { DashboardSummaryCards } from '@/app/[locale]/components/dashboard-summary-cards';
import React, { useState } from 'react';

export function DashboardView() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <DashboardSummaryCards />
        <DashboardNavigationCards />
      </main>
    </div>
  );
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <DashboardView />;
  }

  return (
    <div className="from-background to-muted min-h-screen bg-gradient-to-br">
      <main className="container mx-auto px-4 py-12">
        <AuthForm onLoginSuccess={handleLogin} />
      </main>
    </div>
  );
}
