
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const responseData = [
  { month: 'Jan', responses: 120 },
  { month: 'Feb', responses: 190 },
  { month: 'Mar', responses: 250 },
  { month: 'Apr', responses: 180 },
  { month: 'May', responses: 290 },
  { month: 'Jun', responses: 340 },
];

export const MonthlyResponseChart = () => (
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
);
