import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy } from 'lucide-react';
import { Survey } from '@/types/survey';

interface SendSurveyDialogProps {
  survey: Survey | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SendSurveyDialog = ({ survey, isOpen, onOpenChange }: SendSurveyDialogProps) => {
  const { toast } = useToast();
  const [emailRecipients, setEmailRecipients] = useState('');
  const [slackRecipients, setSlackRecipients] = useState('');

  const handleSend = (method: 'email' | 'slack') => {
    if (!survey) return;

    if (method === 'email' && !emailRecipients.trim()) {
      toast({ title: "Recipients required", description: "Please enter at least one email address.", variant: "destructive" });
      return;
    }

    if (method === 'slack' && !slackRecipients.trim()) {
      toast({ title: "Recipients required", description: "Please enter at least one Slack User ID.", variant: "destructive" });
      return;
    }

    // This is a simulation. In a real app, you'd make an API call here.
    console.log(`Sending survey "${survey.title}" via ${method} to:`, method === 'email' ? emailRecipients : slackRecipients);
    
    toast({
      title: "Survey Sent (Simulation)",
      description: `Your survey "${survey.title}" has been "sent" via ${method}.`,
    });

    onOpenChange(false);
    setEmailRecipients('');
    setSlackRecipients('');
  };

  const surveyLink = survey ? `${window.location.origin}/respond/${survey.id}` : '';

  const copyLink = () => {
    navigator.clipboard.writeText(surveyLink);
    toast({ title: "Link copied to clipboard!" });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Survey: {survey?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                Link
                </Label>
                <Input
                  id="link"
                  defaultValue={surveyLink}
                  readOnly
                />
            </div>
            <Button type="button" size="sm" className="px-3" onClick={copyLink}>
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="slack">Slack</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-recipients">Email Recipients</Label>
                <Textarea
                  id="email-recipients"
                  placeholder="Enter email addresses, separated by commas"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button onClick={() => handleSend('email')}>Send via Email</Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="slack">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="slack-recipients">Slack User IDs</Label>
                <Textarea
                  id="slack-recipients"
                  placeholder="Enter Slack User IDs, separated by commas"
                  value={slackRecipients}
                  onChange={(e) => setSlackRecipients(e.target.value)}
                  className="min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">This will simulate sending a direct message from your Slackbot.</p>
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button onClick={() => handleSend('slack')}>Send via Slack</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
