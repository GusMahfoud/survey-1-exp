
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const responseData = [
  { month: 'Jan', responses: 120, surveys: 15, nps: 45 },
  { month: 'Feb', responses: 190, surveys: 22, nps: 52 },
  { month: 'Mar', responses: 250, surveys: 28, nps: 48 },
  { month: 'Apr', responses: 180, surveys: 20, nps: 55 },
  { month: 'May', responses: 290, surveys: 35, nps: 58 },
  { month: 'Jun', responses: 340, surveys: 42, nps: 62 },
];

const npsDistribution = [
  { name: 'Promoters', value: 45, color: '#22c55e' },
  { name: 'Passives', value: 30, color: '#f59e0b' },
  { name: 'Detractors', value: 25, color: '#ef4444' },
];

const jobsData = [
  { task: 'Email Send', completed: 45, failed: 3, pending: 12 },
  { task: 'Form Generation', completed: 38, failed: 1, pending: 8 },
  { task: 'Data Analysis', completed: 23, failed: 0, pending: 5 },
  { task: 'Report Export', completed: 15, failed: 2, pending: 3 },
];

export const DataVisualization = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
      
      {/* Response Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📈 Response Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="responses" stroke="#3b82f6" strokeWidth={3} name="Responses" />
                <Line type="monotone" dataKey="surveys" stroke="#8b5cf6" strokeWidth={3} name="Surveys" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 NPS Score Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="nps" stroke="#22c55e" strokeWidth={3} name="NPS Score" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* NPS Distribution and Job Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 NPS Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={npsDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  labelLine={false}
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {npsDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ Job Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="task" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📱 Real-time System Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-muted-foreground">API Uptime</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">245ms</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-muted-foreground">Active Sessions</div>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-muted-foreground">Queue Jobs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
