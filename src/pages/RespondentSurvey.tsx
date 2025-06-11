
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

export const RespondentSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState({
    npsScore: '',
    supportingAnswer: '',
    email: '',
    department: '',
    additionalComments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleNpsChange = (value: string) => {
    setResponses(prev => ({ ...prev, npsScore: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setResponses(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !responses.npsScore) {
      toast({
        title: "Please select a rating",
        description: "A rating is required to continue.",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (!responses.email) {
      toast({
        title: "Email required",
        description: "Please provide your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCompleted(true);
      setIsSubmitting(false);
      toast({
        title: "Thank you for your feedback!",
        description: "Your response has been submitted successfully.",
      });
    }, 2000);
  };

  const showSupportingQuestion = responses.npsScore && parseInt(responses.npsScore) >= 7;

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

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center shadow-lg">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Thank You!</h2>
            <p className="text-muted-foreground mb-4">
              Your feedback has been successfully submitted and will help us improve our services.
            </p>
            <div className="bg-secondary/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Survey ID: #SRV-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">
              Customer Experience Survey
            </CardTitle>
            <p className="text-muted-foreground">
              Help us understand your experience with our services
            </p>
          </CardHeader>
          
          <CardContent>
            {/* Step 1: NPS Rating */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    How likely are you to recommend our service to a friend or colleague?
                  </h3>
                  <div className="flex justify-between text-sm text-muted-foreground mb-6">
                    <span>Not at all likely</span>
                    <span>Extremely likely</span>
                  </div>
                </div>

                <RadioGroup 
                  value={responses.npsScore} 
                  onValueChange={handleNpsChange}
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

                {responses.npsScore && (
                  <div className="text-center mt-4">
                    <span className={`text-sm font-medium ${getRatingColor(parseInt(responses.npsScore))}`}>
                      {getRatingLabel(parseInt(responses.npsScore))} ({responses.npsScore}/10)
                    </span>
                  </div>
                )}

                {/* Conditional Supporting Question */}
                {showSupportingQuestion && (
                  <div className="space-y-3 animate-in slide-in-from-top-2 duration-300 border-t pt-6">
                    <Label className="text-base font-medium text-foreground">
                      Great! We'd love to hear more about your positive experience.
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      What specifically did you like about our service?
                    </p>
                    <Textarea
                      placeholder="Please share what made your experience great..."
                      value={responses.supportingAnswer}
                      onChange={(e) => handleInputChange('supportingAnswer', e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                )}

                <div className="flex justify-center pt-4">
                  <Button onClick={handleNext} className="px-8">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Additional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground text-center mb-6">
                  Help us understand you better
                </h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={responses.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="department" className="text-base font-medium">
                      Department/Role
                    </Label>
                    <Input
                      id="department"
                      placeholder="e.g., Engineering, Sales, Marketing"
                      value={responses.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleNext}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Final Comments */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground text-center mb-6">
                  Any additional comments?
                </h3>

                <div>
                  <Label htmlFor="comments" className="text-base font-medium">
                    Additional Feedback (Optional)
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Share any other thoughts, suggestions, or feedback..."
                    value={responses.additionalComments}
                    onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                    className="min-h-[120px] resize-none mt-2"
                  />
                </div>

                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Summary of your responses:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Rating: {responses.npsScore}/10 ({getRatingLabel(parseInt(responses.npsScore))})</li>
                    <li>• Email: {responses.email}</li>
                    {responses.department && <li>• Department: {responses.department}</li>}
                    {responses.supportingAnswer && <li>• Provided additional feedback</li>}
                  </ul>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="px-8"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Survey"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>This survey is confidential and helps us improve our service.</p>
          <p className="mt-1">Estimated time: 2-3 minutes</p>
        </div>
      </div>
    </div>
  );
};
