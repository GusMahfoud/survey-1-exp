
import React from 'react';
import { MetricCard } from '@/components/MetricCard';
import { AnalyticsChart } from '@/components/AnalyticsChart';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MonthlyResponseChart } from '@/components/analytics/MonthlyResponseChart';
import { SatisfactionPieChart } from '@/components/analytics/SatisfactionPieChart';

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Active Surveys"
          value={42}
          change="+12% from last month"
          icon="📝"
          trend="up"
        />
        <MetricCard
          title="Total Responses"
          value="1,340"
          change="+23% from last month"
          icon="💬"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnalyticsChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyResponseChart />
        <SatisfactionPieChart />
      </div>
    </div>
  );
};
