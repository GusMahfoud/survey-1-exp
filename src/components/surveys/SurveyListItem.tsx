
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Edit, Trash2, Eye, Copy } from "lucide-react";
import { Survey } from '@/types/survey';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SurveyListItemProps {
  survey: Survey;
  onDelete: (id: number) => void;
  onCopyLink: (id: number) => void;
  onOpenSendDialog: (survey: Survey) => void;
}

export const SurveyListItem = ({ survey, onDelete, onCopyLink, onOpenSendDialog }: SurveyListItemProps) => {
  const navigate = useNavigate();

  return (
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
            <Button variant="ghost" size="sm" onClick={() => onOpenSendDialog(survey)} title="Send Survey">
              <Send size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onCopyLink(survey.id)} title="Copy Link">
              <Copy size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.open(`/respond/${survey.id}`, '_blank')} title="Preview Survey">
              <Eye size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/surveys/new`)} title="Edit Survey">
              <Edit size={16} />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" title="Delete Survey">
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the "{survey.title}" survey and all of its responses.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className={buttonVariants({ variant: "destructive" })}
                    onClick={() => onDelete(survey.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
