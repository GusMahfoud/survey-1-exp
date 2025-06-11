
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const surveys = [
  { id: 'SRV_001', title: 'Customer Satisfaction Q2', status: 'active', responses: 234, created: '2024-06-01' },
  { id: 'SRV_002', title: 'Product Feedback Survey', status: 'draft', responses: 0, created: '2024-06-10' },
  { id: 'SRV_003', title: 'Employee Engagement', status: 'completed', responses: 145, created: '2024-05-15' },
  { id: 'SRV_004', title: 'Market Research Q2', status: 'active', responses: 89, created: '2024-06-05' },
];

export const Surveys = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Survey Management</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Create New Survey
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{survey.title}</CardTitle>
                <Badge variant={survey.status === 'active' ? 'default' : survey.status === 'completed' ? 'secondary' : 'outline'}>
                  {survey.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Survey ID: {survey.id}</p>
                  <p className="text-sm text-muted-foreground">Created: {survey.created}</p>
                  <p className="text-sm">📊 {survey.responses} responses</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Analytics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
