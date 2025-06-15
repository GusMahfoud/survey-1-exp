import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/MetricCard";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { Plus, Send, BarChart3, Database, Users } from "lucide-react";
import { Link } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const AdminDashboard = () => {
  const metrics = [
    { title: "Active Surveys", value: "12", change: "+2 this week", icon: "📊", trend: "up" as const },
    { title: "Total Responses", value: "1,247", change: "+18% vs last month", icon: "📝", trend: "up" as const },
    { title: "Avg Response Rate", value: "67%", change: "+5% improvement", icon: "📈", trend: "up" as const },
  ];

  const recentSurveys = [
    { id: 1, name: "Customer Satisfaction Q4", responses: 234, status: "active", lastResponse: "2 hours ago" },
    { id: 2, name: "Product Feedback Survey", responses: 89, status: "active", lastResponse: "5 minutes ago" },
    { id: 3, name: "Employee NPS Survey", responses: 156, status: "completed", lastResponse: "1 day ago" },
    { id: 4, name: "Market Research Study", responses: 45, status: "active", lastResponse: "30 minutes ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage surveys, monitor jobs, and analyze responses</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/analytics">
              <BarChart3 size={16} />
              View Analytics
            </Link>
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link to="/admin/surveys/new">
              <Plus size={16} />
              Create Survey
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Surveys */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              Recent Surveys
            </CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSurveys.map((survey) => (
                <div key={survey.id} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(survey.status)}`}></div>
                    <div>
                      <h4 className="font-medium">{survey.name}</h4>
                      <p className="text-sm text-muted-foreground">{survey.responses} responses</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={survey.status === 'active' ? 'default' : 'secondary'}>
                      {survey.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{survey.lastResponse}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send size={20} />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus size={16} className="mr-2" />
              Create New Survey
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Send size={16} className="mr-2" />
              Send Email Campaign
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 size={16} className="mr-2" />
              Generate Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Database size={16} className="mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts and System Status */}
      <Link to="/analytics" className="block hover:opacity-80 transition-opacity">
        <AnalyticsChart />
      </Link>
    </div>
  );
};
