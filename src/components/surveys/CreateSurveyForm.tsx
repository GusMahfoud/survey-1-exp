
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NewSurveyState {
  title: string;
  description: string;
  questions: any[];
}

interface CreateSurveyFormProps {
  newSurvey: NewSurveyState;
  setNewSurvey: (survey: NewSurveyState) => void;
  handleCreateSurvey: () => void;
  onCancel: () => void;
}

export const CreateSurveyForm = ({ newSurvey, setNewSurvey, handleCreateSurvey, onCancel }: CreateSurveyFormProps) => {
  return (
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
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
};
