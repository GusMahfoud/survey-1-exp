
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Send, Edit, Trash2, Eye, Copy } from "lucide-react";
import { SendSurveyDialog } from '@/components/SendSurveyDialog';
import { SidebarTrigger } from '@/components/ui/sidebar';

type Survey = {
  id: number;
  title: string;
  description: string;
  status: "active" | "draft";
  responses: number;
  created: string;
  lastModified: string;
};

export const Surveys = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: 1,
      title: "Customer Satisfaction Q4 2024",
      description: "Quarterly customer satisfaction survey",
      status: "active",
      responses: 234,
      created: "2024-01-15",
      lastModified: "2024-01-20"
    },
    {
      id: 2,
      title: "Product Feedback Survey",
      description: "Feedback on new product features",
      status: "draft",
      responses: 0,
      created: "2024-01-18",
      lastModified: "2024-01-18"
    },
    {
      id: 3,
      title: "Employee NPS Survey",
      description: "Internal employee satisfaction measurement",
      status: "active",
      responses: 156,
      created: "2024-01-10",
      lastModified: "2024-01-25"
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newSurvey, setNewSurvey] = useState({
    title: '',
    description: '',
    questions: []
  });
  
  const { toast } = useToast();

  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  const handleOpenSendDialog = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsSendDialogOpen(true);
  };

  const handleCreateSurvey = () => {
    if (!newSurvey.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a survey title.",
        variant: "destructive"
      });
      return;
    }

    const survey: Survey = {
      id: surveys.length + 1,
      title: newSurvey.title,
      description: newSurvey.description,
      status: "draft",
      responses: 0,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setSurveys([...surveys, survey]);
    setNewSurvey({ title: '', description: '', questions: [] });
    setIsCreating(false);
    
    toast({
      title: "Survey created!",
      description: `"${survey.title}" has been created successfully.`,
    });
  };

  const handleDeleteSurvey = (surveyId: number) => {
    setSurveys(surveys.filter(survey => survey.id !== surveyId));
    toast({
      title: "Survey deleted",
      description: "The survey has been successfully deleted.",
      variant: "destructive"
    });
  };

  const copyShareLink = (surveyId: number) => {
    const link = `${window.location.origin}/respond/${surveyId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Survey link has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-2xl font-bold text-foreground">Survey Management</h2>
            <p className="text-muted-foreground">Create, edit, and manage your surveys</p>
          </div>
        </div>
        <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Create Survey
        </Button>
      </div>

      {isCreating && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Create New Survey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Survey Title *</label>
              <Input
                placeholder="Enter survey title..."
                value={newSurvey.title}
                onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Brief description of the survey..."
                value={newSurvey.description}
                onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleCreateSurvey}>Create Survey</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{survey.title}</h3>
                    <Badge variant={survey.status === 'active' ? 'default' : 'secondary'}>
                      {survey.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{survey.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>Responses: {survey.responses}</span>
                    <span>Created: {survey.created}</span>
                    <span>Modified: {survey.lastModified}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenSendDialog(survey)} title="Send Survey">
                    <Send size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => copyShareLink(survey.id)} title="Copy Link">
                    <Copy size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => window.open(`/respond/${survey.id}`, '_blank')} title="Preview Survey">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/surveys/new`)} title="Edit Survey">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteSurvey(survey.id)} title="Delete Survey">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <SendSurveyDialog 
        survey={selectedSurvey}
        isOpen={isSendDialogOpen}
        onOpenChange={setIsSendDialogOpen}
      />
    </div>
  );
};
