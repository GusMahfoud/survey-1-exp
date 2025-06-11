
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const jobs = [
  { id: '1', type: 'Form Generation', status: 'running', progress: 75, agent: 'AGT_001' },
  { id: '2', type: 'Email Send', status: 'pending', progress: 0, agent: 'AGT_002' },
  { id: '3', type: 'Data Analysis', status: 'completed', progress: 100, agent: 'AGT_003' },
  { id: '4', type: 'Survey Processing', status: 'running', progress: 45, agent: 'AGT_001' },
  { id: '5', type: 'Slack Notification', status: 'failed', progress: 0, agent: 'AGT_004' },
];

export const JobQueue = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>⚙️</span>
          Active Job Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 bg-secondary/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`}></div>
                  <span className="font-medium">{job.type}</span>
                  <Badge variant="outline">#{job.id}</Badge>
                </div>
                <Badge variant="secondary">{job.agent}</Badge>
              </div>
              {job.status === 'running' && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} className="h-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
