import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationControls = ({
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false
}) => {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;
  const canProceed = selectedAnswer !== null;

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
      {/* Previous Button */}
      <Button
        variant="outline"
        iconName="ChevronLeft"
        iconPosition="left"
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className={`${isFirstQuestion ? 'invisible' : ''}`}
      >
        Previous
      </Button>

      {/* Question Counter */}
      <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-muted/50">
        <Icon name="Circle" size={8} className="text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          {currentQuestion} / {totalQuestions}
        </span>
        <Icon name="Circle" size={8} className="text-muted-foreground" />
      </div>

      {/* Next/Submit Button */}
      {isLastQuestion ? (
        <Button
          variant="default"
          iconName="CheckCircle"
          iconPosition="right"
          onClick={onSubmit}
          disabled={!canProceed}
          loading={isSubmitting}
          className="bg-success hover:bg-success/90"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
        </Button>
      ) : (
        <Button
          variant="default"
          iconName="ChevronRight"
          iconPosition="right"
          onClick={onNext}
          disabled={!canProceed}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default NavigationControls;