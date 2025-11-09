import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  showLabels = true,
  variant = 'default',
  className = ''
}) => {
  const defaultSteps = [
    { label: 'Assessment', icon: 'Brain', description: 'Complete aptitude test' },
    { label: 'Explore', icon: 'Compass', description: 'Discover careers' },
    { label: 'Research', icon: 'Search', description: 'Find colleges' },
    { label: 'Plan', icon: 'Calendar', description: 'Create timeline' }
  ];

  const progressSteps = steps?.length > 0 ? steps : defaultSteps?.slice(0, totalSteps);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'Check';
    return step?.icon || 'Circle';
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {currentStep}/{totalSteps}
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-10" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary -translate-y-1/2 z-20 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Steps */}
        <div className="relative flex justify-between z-30">
          {progressSteps?.map((step, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            
            return (
              <div key={index} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-primary border-primary text-primary-foreground'
                      : status === 'current' ?'bg-background border-primary text-primary shadow-elevation-2' :'bg-background border-muted text-muted-foreground'
                  }`}
                >
                  <Icon 
                    name={getStepIcon(step, status)} 
                    size={16} 
                    className={`transition-colors ${
                      status === 'completed' ? 'text-primary-foreground' : ''
                    }`}
                  />
                </div>
                {/* Step Label */}
                {showLabels && (
                  <div className="mt-3 text-center max-w-20">
                    <p className={`text-sm font-medium ${
                      status === 'current' ?'text-primary' 
                        : status === 'completed' ?'text-foreground' :'text-muted-foreground'
                    }`}>
                      {step?.label}
                    </p>
                    {step?.description && (
                      <p className="text-xs text-muted-foreground mt-1 leading-tight">
                        {step?.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Current Step Info */}
      {variant === 'detailed' && (
        <div className="glass-card rounded-lg p-4 border border-border/40">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Icon 
                name={progressSteps?.[currentStep - 1]?.icon || 'Circle'} 
                size={16} 
                className="text-primary"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Step {currentStep}: {progressSteps?.[currentStep - 1]?.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {progressSteps?.[currentStep - 1]?.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary">
                {Math.round(progressPercentage)}% Complete
              </p>
              <p className="text-xs text-muted-foreground">
                {totalSteps - currentStep} steps remaining
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;