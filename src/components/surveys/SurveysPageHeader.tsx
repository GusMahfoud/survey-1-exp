
import React from 'react';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Plus } from "lucide-react";

interface SurveysPageHeaderProps {
  onShowCreateForm: () => void;
}

export const SurveysPageHeader = ({ onShowCreateForm }: SurveysPageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h2 className="text-2xl font-bold text-foreground">Survey Management</h2>
          <p className="text-muted-foreground">Create, edit, and manage your surveys</p>
        </div>
      </div>
      <Button onClick={onShowCreateForm} className="flex items-center gap-2">
        <Plus size={16} />
        Create Survey
      </Button>
    </div>
  );
};
