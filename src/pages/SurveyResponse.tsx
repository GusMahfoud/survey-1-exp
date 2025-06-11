
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const SurveyResponse = () => {
  const [npsScore, setNpsScore] = useState<string>('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!npsScore) {
      toast({
        title: "Please select a rating",
        description: "A rating is required to submit the survey.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for your feedback!",
        description: "Your response has been submitted successfully.",
      });
      setIsSubmitting(false);
      // Reset form
      setNpsScore('');
      setAdditionalFeedback('');
    }, 1500);
  };

  const showAdditionalFeedback = npsScore && parseInt(npsScore) >= 7;

  const getRatingLabel = (score: number) => {
    if (score >= 9) return "Promoter";
    if (score >= 7) return "Passive";
    return "Detractor";
  };

  const getRatingColor = (score: number) => {
    if (score >= 9) return "text-green-600";
    if (score >= 7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Customer Satisfaction Survey
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              We value your feedback! Please take a moment to rate your experience.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NPS Question */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    How likely are you to recommend our service to a friend or colleague?
                  </h3>
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>Not at all likely</span>
                    <span>Extremely likely</span>
                  </div>
                </div>

                <RadioGroup 
                  value={npsScore} 
                  onValueChange={setNpsScore}
                  className="grid grid-cols-11 gap-2 justify-items-center"
                >
                  {Array.from({ length: 11 }, (_, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                      <RadioGroupItem value={i.toString()} id={`score-${i}`} />
                      <Label 
                        htmlFor={`score-${i}`} 
                        className="text-sm font-medium cursor-pointer hover:text-primary"
                      >
                        {i}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Rating Category Display */}
                {npsScore && (
                  <div className="text-center mt-4">
                    <span className={`text-sm font-medium ${getRatingColor(parseInt(npsScore))}`}>
                      {getRatingLabel(parseInt(npsScore))} ({npsScore}/10)
                    </span>
                  </div>
                )}
              </div>

              {/* Conditional Additional Feedback */}
              {showAdditionalFeedback && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="border-t pt-4">
                    <Label htmlFor="feedback" className="text-base font-medium text-foreground">
                      Great! We'd love to hear more about your positive experience.
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      What specifically did you like about our service?
                    </p>
                    <Textarea
                      id="feedback"
                      placeholder="Please share what made your experience great..."
                      value={additionalFeedback}
                      onChange={(e) => setAdditionalFeedback(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Survey"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Survey Info */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>This survey should take less than 2 minutes to complete.</p>
          <p className="mt-1">Your responses are confidential and help us improve our service.</p>
        </div>
      </div>
    </div>
  );
};
