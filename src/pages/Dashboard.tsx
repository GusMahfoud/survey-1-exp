import React from 'react';
import { MetricCard } from '../components/MetricCard';
import { AnalyticsChart } from '../components/AnalyticsChart';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">AI Survey Dashboard</h1>
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
    </div>
  );
};
