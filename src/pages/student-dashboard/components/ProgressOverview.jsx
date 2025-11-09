import React from 'react';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ 
  currentStep = 2,
  assessmentProgress = 85,
  explorationProgress = 60,
  collegeResearchProgress = 30,
  timelineProgress = 15
}) => {
  const progressSteps = [
    {
      label: 'Assessment',
      icon: 'Brain',
      description: 'Discover your strengths',
      progress: assessmentProgress,
      completed: assessmentProgress === 100
    },
    {
      label: 'Explore',
      icon: 'Compass',
      description: 'Find career paths',
      progress: explorationProgress,
      completed: explorationProgress === 100
    },
    {
      label: 'Research',
      icon: 'GraduationCap',
      description: 'Choose colleges',
      progress: collegeResearchProgress,
      completed: collegeResearchProgress === 100
    },
    {
      label: 'Plan',
      icon: 'Calendar',
      description: 'Create timeline',
      progress: timelineProgress,
      completed: timelineProgress === 100
    }
  ];

  const overallProgress = Math.round(
    (assessmentProgress + explorationProgress + collegeResearchProgress + timelineProgress) / 4
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Your Journey Progress</h2>
          <p className="text-sm text-muted-foreground">Track your career discovery milestones</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{overallProgress}%</p>
          <p className="text-xs text-muted-foreground">Overall Complete</p>
        </div>
      </div>
      {/* Progress Indicator */}
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={4}
        steps={progressSteps}
        variant="detailed"
        className="mb-6"
      />
      {/* Detailed Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {progressSteps?.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = step?.completed;
          
          return (
            <div
              key={index}
              className={`glass-card rounded-xl border p-4 transition-all duration-300 hover:shadow-elevation-2 ${
                isActive
                  ? 'border-primary/40 bg-primary/5'
                  : isCompleted
                  ? 'border-success/40 bg-success/5' :'border-border/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                    isCompleted
                      ? 'bg-success text-success-foreground'
                      : isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon
                    name={isCompleted ? 'Check' : step?.icon}
                    size={16}
                  />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isCompleted
                    ? 'bg-success/10 text-success'
                    : isActive
                    ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? 'Done' : isActive ? 'Active' : 'Pending'}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className={`font-semibold text-sm ${
                  isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-foreground'
                }`}>
                  {step?.label}
                </h3>
                <p className="text-xs text-muted-foreground">{step?.description}</p>
                
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className={
                      isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                    }>
                      {step?.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-success'
                          : isActive
                          ? 'bg-primary' :'bg-muted-foreground'
                      }`}
                      style={{ width: `${step?.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Next Step Recommendation */}
      <div className="glass-card rounded-xl border border-border/40 p-4 bg-gradient-to-r from-accent/5 to-warning/5">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
            <Icon name="Lightbulb" size={20} className="text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Recommended Next Step</h4>
            <p className="text-sm text-muted-foreground">
              {currentStep === 1 && "Complete your aptitude assessment to discover your strengths"}
              {currentStep === 2 && "Explore career paths that match your assessment results"}
              {currentStep === 3 && "Research colleges and programs for your chosen career"}
              {currentStep === 4 && "Create your application timeline and track deadlines"}
            </p>
          </div>
          <Icon name="ArrowRight" size={16} className="text-accent" />
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;