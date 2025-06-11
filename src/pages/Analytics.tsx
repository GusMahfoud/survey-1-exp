
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
      <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>

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

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-700 mb-2">🎯 Key Finding</h3>
              <p className="text-sm text-muted-foreground">Customers who receive follow-up emails are 40% more likely to complete surveys</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-2">📈 Trend Alert</h3>
              <p className="text-sm text-muted-foreground">Response rates peak on Tuesday afternoons between 2-4 PM</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-700 mb-2">💡 Recommendation</h3>
              <p className="text-sm text-muted-foreground">Consider A/B testing shorter survey forms to improve completion rates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
