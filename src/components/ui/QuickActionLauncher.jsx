import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionLauncher = ({ 
  userProgress = {}, 
  className = '',
  variant = 'grid' 
}) => {
  const navigate = useNavigate();
  const [hoveredAction, setHoveredAction] = useState(null);

  const quickActions = [
    {
      id: 'assessment',
      title: 'Take Assessment',
      description: 'Discover your strengths and interests',
      icon: 'Brain',
      path: '/aptitude-assessment',
      color: 'primary',
      completed: userProgress?.assessmentCompleted || false,
      progress: userProgress?.assessmentProgress || 0,
      estimatedTime: '15 min',
      priority: 'high'
    },
    {
      id: 'explore',
      title: 'Explore Careers',
      description: 'Find careers that match your profile',
      icon: 'Compass',
      path: '/career-exploration',
      color: 'secondary',
      completed: userProgress?.explorationCompleted || false,
      progress: userProgress?.explorationProgress || 0,
      estimatedTime: '20 min',
      priority: 'high'
    },
    {
      id: 'colleges',
      title: 'Research Colleges',
      description: 'Find the perfect college for you',
      icon: 'GraduationCap',
      path: '/college-details',
      color: 'accent',
      completed: userProgress?.collegeResearchCompleted || false,
      progress: userProgress?.collegeResearchProgress || 0,
      estimatedTime: '30 min',
      priority: 'medium'
    },
    {
      id: 'timeline',
      title: 'Plan Timeline',
      description: 'Track deadlines and milestones',
      icon: 'Calendar',
      path: '/timeline-tracker',
      color: 'success',
      completed: userProgress?.timelineCompleted || false,
      progress: userProgress?.timelineProgress || 0,
      estimatedTime: '10 min',
      priority: 'medium'
    },
    {
      id: 'chat',
      title: 'Ask AI Advisor',
      description: 'Get personalized guidance',
      icon: 'MessageCircle',
      path: '/ai-chat-assistant',
      color: 'warning',
      completed: false,
      progress: 0,
      estimatedTime: '5 min',
      priority: 'low',
      isModal: true
    }
  ];

  const handleActionClick = (action) => {
    if (action?.isModal) {
      // Handle modal actions (like AI chat)
      return;
    }
    navigate(action?.path);
  };

  const getColorClasses = (color, isHovered = false) => {
    const colors = {
      primary: {
        bg: isHovered ? 'bg-primary/15' : 'bg-primary/10',
        text: 'text-primary',
        border: 'border-primary/20',
        icon: 'text-primary'
      },
      secondary: {
        bg: isHovered ? 'bg-secondary/15' : 'bg-secondary/10',
        text: 'text-secondary',
        border: 'border-secondary/20',
        icon: 'text-secondary'
      },
      accent: {
        bg: isHovered ? 'bg-accent/15' : 'bg-accent/10',
        text: 'text-accent',
        border: 'border-accent/20',
        icon: 'text-accent'
      },
      success: {
        bg: isHovered ? 'bg-success/15' : 'bg-success/10',
        text: 'text-success',
        border: 'border-success/20',
        icon: 'text-success'
      },
      warning: {
        bg: isHovered ? 'bg-warning/15' : 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/20',
        icon: 'text-warning'
      }
    };
    return colors?.[color] || colors?.primary;
  };

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {quickActions?.slice(0, 3)?.map((action) => {
          const colorClasses = getColorClasses(action?.color);
          return (
            <Button
              key={action?.id}
              variant="outline"
              size="sm"
              iconName={action?.icon}
              iconPosition="left"
              iconSize={16}
              onClick={() => handleActionClick(action)}
              className={`${colorClasses?.border} ${colorClasses?.text} hover:${colorClasses?.bg}`}
            >
              {action?.title}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Get started with your journey</p>
      </div>
      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => {
          const colorClasses = getColorClasses(action?.color, hoveredAction === action?.id);
          const isCompleted = action?.completed;
          
          return (
            <div
              key={action?.id}
              className={`glass-card rounded-xl border border-border/40 p-4 transition-all duration-300 cursor-pointer hover:shadow-elevation-2 animate-scale-hover ${
                colorClasses?.bg
              } ${colorClasses?.border}`}
              onMouseEnter={() => setHoveredAction(action?.id)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={() => handleActionClick(action)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses?.bg}`}>
                  <Icon 
                    name={action?.icon} 
                    size={20} 
                    className={colorClasses?.icon}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  {isCompleted && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-success/10">
                      <Icon name="Check" size={12} className="text-success" />
                    </div>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    action?.priority === 'high' ?'bg-error/10 text-error' 
                      : action?.priority === 'medium' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
                  }`}>
                    {action?.priority}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="space-y-2">
                <h4 className={`font-semibold ${colorClasses?.text}`}>
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {action?.description}
                </p>
              </div>
              {/* Progress */}
              {action?.progress > 0 && (
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className={colorClasses?.text}>{action?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        action?.color === 'primary' ? 'bg-primary' :
                        action?.color === 'secondary' ? 'bg-secondary' :
                        action?.color === 'accent' ? 'bg-accent' :
                        action?.color === 'success'? 'bg-success' : 'bg-warning'
                      }`}
                      style={{ width: `${action?.progress}%` }}
                    />
                  </div>
                </div>
              )}
              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{action?.estimatedTime}</span>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    hoveredAction === action?.id ? 'translate-x-1' : ''
                  } ${colorClasses?.icon}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* CTA Section */}
      <div className="glass-card rounded-xl border border-border/40 p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground">Ready to start your journey?</h4>
            <p className="text-sm text-muted-foreground">
              Complete your assessment to unlock personalized recommendations
            </p>
          </div>
          <Button
            variant="default"
            iconName="Rocket"
            iconPosition="left"
            onClick={() => navigate('/aptitude-assessment')}
            className="shrink-0"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionLauncher;