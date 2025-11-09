import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ 
  unlockedBadges = ['assessment-complete', 'first-exploration', 'college-saver'],
  totalBadges = 12
}) => {
  const allBadges = [
    {
      id: 'assessment-complete',
      title: 'Assessment Master',
      description: 'Completed aptitude assessment',
      icon: 'Brain',
      color: 'primary',
      unlocked: true,
      unlockedDate: '2024-09-10'
    },
    {
      id: 'first-exploration',
      title: 'Career Explorer',
      description: 'Explored first career path',
      icon: 'Compass',
      color: 'secondary',
      unlocked: true,
      unlockedDate: '2024-09-11'
    },
    {
      id: 'college-saver',
      title: 'College Collector',
      description: 'Saved 5 colleges to wishlist',
      icon: 'Bookmark',
      color: 'accent',
      unlocked: true,
      unlockedDate: '2024-09-12'
    },
    {
      id: 'timeline-creator',
      title: 'Timeline Planner',
      description: 'Created first timeline',
      icon: 'Calendar',
      color: 'success',
      unlocked: false
    },
    {
      id: 'ai-chatter',
      title: 'AI Conversationalist',
      description: 'Had 10 conversations with AI',
      icon: 'MessageCircle',
      color: 'warning',
      unlocked: false
    },
    {
      id: 'research-pro',
      title: 'Research Pro',
      description: 'Researched 20 colleges',
      icon: 'Search',
      color: 'primary',
      unlocked: false
    },
    {
      id: 'deadline-tracker',
      title: 'Deadline Tracker',
      description: 'Never missed a deadline',
      icon: 'Clock',
      color: 'secondary',
      unlocked: false
    },
    {
      id: 'pathway-master',
      title: 'Pathway Master',
      description: 'Explored all career paths',
      icon: 'Map',
      color: 'accent',
      unlocked: false
    }
  ];

  const badges = allBadges?.map(badge => ({
    ...badge,
    unlocked: unlockedBadges?.includes(badge?.id)
  }));

  const unlockedCount = badges?.filter(badge => badge?.unlocked)?.length;

  const getColorClasses = (color, unlocked) => {
    if (!unlocked) {
      return {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        border: 'border-muted',
        icon: 'text-muted-foreground'
      };
    }

    const colors = {
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        border: 'border-primary/20',
        icon: 'text-primary'
      },
      secondary: {
        bg: 'bg-secondary/10',
        text: 'text-secondary',
        border: 'border-secondary/20',
        icon: 'text-secondary'
      },
      accent: {
        bg: 'bg-accent/10',
        text: 'text-accent',
        border: 'border-accent/20',
        icon: 'text-accent'
      },
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        border: 'border-success/20',
        icon: 'text-success'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/20',
        icon: 'text-warning'
      }
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
          <p className="text-sm text-muted-foreground">Your learning milestones</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{unlockedCount}/{totalBadges}</p>
          <p className="text-xs text-muted-foreground">Badges Earned</p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Achievement Progress</span>
          <span className="text-primary font-medium">
            {Math.round((unlockedCount / totalBadges) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${(unlockedCount / totalBadges) * 100}%` }}
          />
        </div>
      </div>
      {/* Badges Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {badges?.slice(0, 8)?.map((badge) => {
          const colorClasses = getColorClasses(badge?.color, badge?.unlocked);
          
          return (
            <div
              key={badge?.id}
              className={`glass-card rounded-xl border p-4 text-center transition-all duration-300 hover:shadow-elevation-2 ${
                badge?.unlocked ? 'animate-scale-hover' : 'opacity-60'
              } ${colorClasses?.bg} ${colorClasses?.border}`}
            >
              <div className="space-y-3">
                {/* Badge Icon */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto ${
                  badge?.unlocked ? colorClasses?.bg : 'bg-muted'
                }`}>
                  <Icon
                    name={badge?.icon}
                    size={24}
                    className={colorClasses?.icon}
                  />
                  {badge?.unlocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={10} color="white" />
                    </div>
                  )}
                </div>

                {/* Badge Info */}
                <div className="space-y-1">
                  <h3 className={`font-semibold text-sm ${colorClasses?.text}`}>
                    {badge?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {badge?.description}
                  </p>
                  {badge?.unlocked && badge?.unlockedDate && (
                    <p className="text-xs text-success">
                      Earned {new Date(badge.unlockedDate)?.toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Lock/Unlock Indicator */}
                {!badge?.unlocked && (
                  <div className="flex items-center justify-center">
                    <Icon name="Lock" size={12} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Next Achievement */}
      <div className="glass-card rounded-xl border border-border/40 p-4 bg-gradient-to-r from-warning/5 to-accent/5">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-warning/10">
            <Icon name="Target" size={20} className="text-warning" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">Next Achievement</h4>
            <p className="text-sm text-muted-foreground">
              Complete your timeline to unlock "Timeline Planner" badge
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-warning">75% Progress</p>
            <div className="w-16 bg-muted rounded-full h-1 mt-1">
              <div className="w-3/4 h-1 bg-warning rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;