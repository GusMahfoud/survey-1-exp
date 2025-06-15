
import React from 'react';
import { SurveyListItem } from './SurveyListItem';
import { Survey } from '@/types/survey';

interface SurveyListProps {
  surveys: Survey[];
  onDelete: (id: number) => void;
  onCopyLink: (id: number) => void;
  onOpenSendDialog: (survey: Survey) => void;
}

export const SurveyList = ({ surveys, onDelete, onCopyLink, onOpenSendDialog }: SurveyListProps) => {
  return (
    <div className="grid gap-4">
      {surveys.map((survey) => (
        <SurveyListItem 
          key={survey.id}
          survey={survey}
          onDelete={onDelete}
          onCopyLink={onCopyLink}
          onOpenSendDialog={onOpenSendDialog}
        />
      ))}
    </div>
  );
};
