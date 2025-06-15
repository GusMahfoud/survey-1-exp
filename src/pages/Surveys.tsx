
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { SendSurveyDialog } from '@/components/SendSurveyDialog';
import { SurveysPageHeader } from '@/components/surveys/SurveysPageHeader';
import { CreateSurveyForm } from '@/components/surveys/CreateSurveyForm';
import { SurveyList } from '@/components/surveys/SurveyList';
import { Survey } from '@/types/survey';

const initialSurveys: Survey[] = [
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
];

export const Surveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
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
      <SurveysPageHeader onShowCreateForm={() => setIsCreating(true)} />

      {isCreating && (
        <CreateSurveyForm 
          newSurvey={newSurvey}
          setNewSurvey={setNewSurvey}
          handleCreateSurvey={handleCreateSurvey}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <SurveyList
        surveys={surveys}
        onDelete={handleDeleteSurvey}
        onCopyLink={copyShareLink}
        onOpenSendDialog={handleOpenSendDialog}
      />

      <SendSurveyDialog 
        survey={selectedSurvey}
        isOpen={isSendDialogOpen}
        onOpenChange={setIsSendDialogOpen}
      />
    </div>
  );
};
