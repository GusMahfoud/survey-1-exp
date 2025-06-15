import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import { SidebarTrigger } from '@/components/ui/sidebar';

type QuestionType = 'text' | 'rating' | 'multiple-choice';

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

const questionTypes: { value: QuestionType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'rating', label: 'Rating (1-10)' },
  { value: 'multiple-choice', label: 'Multiple Choice' },
];

const templateQuestions = [
    { text: "On a scale of 1-10, how likely are you to recommend our company as a place to work?", type: 'rating' as QuestionType, required: true },
    { text: "What is one thing we could do to improve your employee experience?", type: 'text' as QuestionType, required: false },
    { text: "How satisfied are you with your current role and responsibilities?", type: 'multiple-choice' as QuestionType, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'], required: true },
];

export const SurveyBuilder = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      text: '',
      type: 'text',
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };
  
  const addQuestionFromTemplate = (templateQuestion: Omit<Question, 'id'>) => {
    const newQuestion = {
        ...templateQuestion,
        id: Date.now(),
    };
    setQuestions([...questions, newQuestion]);
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const updateQuestion = (id: number, field: keyof Question, value: any) => {
      setQuestions(questions.map(q => q.id === id ? {...q, [field]: value} : q))
  }

  const handleSaveSurvey = () => {
    const surveyData = {
      title: surveyTitle,
      description: surveyDescription,
      questions: questions,
    };
    console.log("Saving survey:", surveyData);
    toast.success("Survey saved successfully!", {
      description: "You can continue editing or come back later.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Survey Builder</h1>
            <p className="text-muted-foreground">Create your survey by adding questions below.</p>
          </div>
        </div>
        <Button onClick={handleSaveSurvey}>Save Survey</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Survey Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="survey-title">Survey Title</Label>
            <Input
              id="survey-title"
              placeholder="e.g., Employee Satisfaction Survey"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="survey-description">Survey Description</Label>
            <Textarea
              id="survey-description"
              placeholder="A brief description of the survey's purpose."
              value={surveyDescription}
              onChange={(e) => setSurveyDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {questions.map((q, index) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Question {index + 1}</span>
                <Button variant="ghost" size="icon" onClick={() => removeQuestion(q.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Enter your question here" 
                value={q.text} 
                onChange={(e) => updateQuestion(q.id, 'text', e.target.value)} 
              />
              <div className="flex items-center gap-4">
                <Select value={q.type} onValueChange={(value: QuestionType) => updateQuestion(q.id, 'type', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Question type" />
                  </SelectTrigger>
                  <SelectContent>
                    {questionTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch id={`required-${q.id}`} checked={q.required} onCheckedChange={(checked) => updateQuestion(q.id, 'required', checked)} />
                  <Label htmlFor={`required-${q.id}`}>Required</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={addQuestion}>
            <Plus className="mr-2 h-4 w-4" /> Add Question
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Add from Template</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Choose a question template</DrawerTitle>
              <DrawerDescription>These are common questions for employee satisfaction surveys.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-2">
              {templateQuestions.map((tq, i) => (
                  <div key={i} className="flex justify-between items-center p-2 border rounded-lg">
                      <p className="text-sm">{tq.text}</p>
                      <DrawerClose asChild>
                        <Button size="sm" onClick={() => addQuestionFromTemplate(tq)}>Add</Button>
                      </DrawerClose>
                  </div>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
