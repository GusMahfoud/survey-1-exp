
import React from 'react';
import { MetricCard } from '../components/MetricCard';
import { SystemStatus } from '../components/SystemStatus';
import { JobQueue } from '../components/JobQueue';
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <MetricCard
          title="Queue Jobs"
          value={18}
          change="5 running, 13 pending"
          icon="⚙️"
          trend="neutral"
        />
        <MetricCard
          title="System Uptime"
          value="99.8%"
          change="All systems operational"
          icon="🟢"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <SystemStatus />
        <JobQueue />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsChart />
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-border/40">
          <h3 className="text-lg font-semibold mb-4 text-foreground">AI Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-background/60 rounded-lg">
              <p className="text-sm text-muted-foreground">📊 Survey completion rate increased by 15% this week</p>
            </div>
            <div className="p-3 bg-background/60 rounded-lg">
              <p className="text-sm text-muted-foreground">🎯 Best performing survey: Customer Satisfaction Q2</p>
            </div>
            <div className="p-3 bg-background/60 rounded-lg">
              <p className="text-sm text-muted-foreground">⚡ Recommended: Optimize email delivery for 3PM PST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
