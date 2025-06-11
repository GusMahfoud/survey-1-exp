
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  { name: "CRM Integration", status: "operational", uptime: "99.9%" },
  { name: "FastAPI Backend", status: "operational", uptime: "99.8%" },
  { name: "Celery Queue", status: "operational", uptime: "99.7%" },
  { name: "PostgreSQL", status: "operational", uptime: "99.9%" },
  { name: "OpenSearch", status: "degraded", uptime: "98.1%" },
  { name: "SendGrid", status: "operational", uptime: "99.5%" },
];

export const SystemStatus = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🔧</span>
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={service.status === 'operational' ? 'default' : 'secondary'}>
                  {service.status}
                </Badge>
                <span className="text-sm text-muted-foreground">{service.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
