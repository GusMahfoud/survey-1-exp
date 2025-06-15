
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MetricCard } from '@/components/MetricCard';
import { AnalyticsChart } from '@/components/AnalyticsChart';
import { SidebarTrigger } from '@/components/ui/sidebar';

const responseData = [
  { month: 'Jan', responses: 120 },
  { month: 'Feb', responses: 190 },
  { month: 'Mar', responses: 250 },
  { month: 'Apr', responses: 180 },
  { month: 'May', responses: 290 },
  { month: 'Jun', responses: 340 },
];

const satisfactionData = [
  { name: 'Very Satisfied', value: 45, color: '#22c55e' },
  { name: 'Satisfied', value: 30, color: '#3b82f6' },
  { name: 'Neutral', value: 15, color: '#f59e0b' },
  { name: 'Dissatisfied', value: 10, color: '#ef4444' },
];

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
        <Card>
          <CardHeader>
            <CardTitle>Monthly Response Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="responses" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
