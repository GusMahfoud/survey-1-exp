
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const responseData = [
  { month: 'Jan', responses: 120, surveys: 15 },
  { month: 'Feb', responses: 190, surveys: 22 },
  { month: 'Mar', responses: 250, surveys: 28 },
  { month: 'Apr', responses: 180, surveys: 20 },
  { month: 'May', responses: 290, surveys: 35 },
  { month: 'Jun', responses: 340, surveys: 42 },
];

export const AnalyticsChart = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📈</span>
          Survey Analytics
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
            <Line type="monotone" dataKey="responses" stroke="#3b82f6" strokeWidth={3} />
            <Line type="monotone" dataKey="surveys" stroke="#8b5cf6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
