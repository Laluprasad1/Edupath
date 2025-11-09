import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LanguageSelector from './LanguageSelector';

const ChatHeader = ({ 
  currentLanguage = 'en',
  onLanguageChange,
  onClearChat,
  onToggleHistory,
  isHistoryOpen = false,
  className = '' 
}) => {
  const navigate = useNavigate();

  return (
    <div className={`glass-nav border-b border-border/40 p-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left Section - AI Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">AI Career Advisor</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success font-medium">Online</span>
              <span className="text-sm text-muted-foreground">• Available 24/7</span>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* History Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="History"
            iconSize={16}
            onClick={onToggleHistory}
            className={`text-muted-foreground hover:text-foreground ${
              isHistoryOpen ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            History
          </Button>

          {/* Clear Chat */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            iconSize={16}
            onClick={onClearChat}
            className="text-muted-foreground hover:text-error"
          >
            Clear
          </Button>

          {/* Back to Dashboard */}
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowLeft"
            iconSize={16}
            onClick={() => navigate('/student-dashboard')}
            className="text-muted-foreground hover:text-foreground border-border/40"
          >
            Dashboard
          </Button>
        </div>
      </div>

      {/* AI Capabilities Info */}
      <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-border/40">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">What I can help you with:</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Compass" size={12} className="text-primary" />
            <span>Career guidance</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="GraduationCap" size={12} className="text-secondary" />
            <span>College search</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Award" size={12} className="text-success" />
            <span>Scholarships</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Calendar" size={12} className="text-accent" />
            <span>Timeline planning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;