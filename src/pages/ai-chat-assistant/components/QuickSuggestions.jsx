import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickSuggestions = ({ suggestions, onSuggestionClick, className = '' }) => {
  const defaultSuggestions = [
    {
      id: 'career-options',
      text: "What career options match my interests?",
      icon: 'Compass',
      category: 'career'
    },
    {
      id: 'college-search',
      text: "Help me find colleges for engineering",
      icon: 'GraduationCap',
      category: 'college'
    },
    {
      id: 'admission-process',
      text: "What\'s the admission process for medical colleges?",
      icon: 'FileText',
      category: 'admission'
    },
    {
      id: 'scholarship-info',
      text: "Tell me about available scholarships",
      icon: 'Award',
      category: 'scholarship'
    },
    {
      id: 'stream-selection',
      text: "Which stream should I choose after 10th?",
      icon: 'BookOpen',
      category: 'guidance'
    },
    {
      id: 'exam-preparation',
      text: "How to prepare for entrance exams?",
      icon: 'Target',
      category: 'exam'
    }
  ];

  const activeSuggestions = suggestions && suggestions?.length > 0 ? suggestions : defaultSuggestions;

  const getCategoryColor = (category) => {
    const colors = {
      career: 'bg-primary/10 text-primary border-primary/20',
      college: 'bg-secondary/10 text-secondary border-secondary/20',
      admission: 'bg-accent/10 text-accent border-accent/20',
      scholarship: 'bg-success/10 text-success border-success/20',
      guidance: 'bg-warning/10 text-warning border-warning/20',
      exam: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[category] || colors?.career;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <Icon name="Lightbulb" size={16} className="text-accent" />
        <h3 className="text-sm font-medium text-foreground">Quick Suggestions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {activeSuggestions?.map((suggestion) => (
          <button
            key={suggestion?.id}
            onClick={() => onSuggestionClick(suggestion?.text)}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] focus-ring text-left ${getCategoryColor(suggestion?.category)}`}
          >
            <Icon name={suggestion?.icon} size={16} />
            <span className="text-sm font-medium flex-1">{suggestion?.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;