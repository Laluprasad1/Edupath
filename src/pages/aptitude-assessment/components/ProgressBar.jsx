import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressBar = ({ 
  currentQuestion, 
  totalQuestions, 
  completedQuestions = [] 
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const completedPercentage = (completedQuestions?.length / totalQuestions) * 100;

  return (
    <div className="w-full bg-background">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <Icon name="Brain" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Aptitude Assessment</h3>
            <p className="text-sm text-muted-foreground">Discover your strengths</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {currentQuestion} of {totalQuestions}
          </p>
          <p className="text-xs text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Question Markers */}
        <div className="absolute top-0 left-0 right-0 flex justify-between h-3">
          {Array.from({ length: totalQuestions }, (_, index) => {
            const questionNum = index + 1;
            const isCompleted = completedQuestions?.includes(questionNum);
            const isCurrent = questionNum === currentQuestion;
            const position = (index / (totalQuestions - 1)) * 100;
            
            return (
              <div
                key={questionNum}
                className={`absolute w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-success border-success'
                    : isCurrent
                    ? 'bg-primary border-primary scale-125' :'bg-background border-muted'
                }`}
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              >
                {isCompleted && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Check" size={8} color="white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Progress Stats */}
      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span>Started</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-success"></div>
            <span>Completed: {completedQuestions?.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-muted"></div>
            <span>Remaining: {totalQuestions - currentQuestion}</span>
          </div>
        </div>
        <span>Finish</span>
      </div>
    </div>
  );
};

export default ProgressBar;