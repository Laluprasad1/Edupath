import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'college_saved',
      title: 'Saved College',
      description: 'Added IIT Delhi to your wishlist',
      timestamp: '2024-09-13T06:30:00Z',
      icon: 'Bookmark',
      color: 'primary',
      link: '/college-details',
      metadata: {
        collegeName: 'IIT Delhi',
        course: 'B.Tech Computer Science'
      }
    },
    {
      id: 2,
      type: 'assessment_progress',
      title: 'Assessment Updated',
      description: 'Completed Logical Reasoning section',
      timestamp: '2024-09-12T14:45:00Z',
      icon: 'Brain',
      color: 'secondary',
      link: '/aptitude-assessment',
      metadata: {
        section: 'Logical Reasoning',
        score: '85%'
      }
    },
    {
      id: 3,
      type: 'career_explored',
      title: 'Career Explored',
      description: 'Viewed Software Engineering pathway',
      timestamp: '2024-09-12T11:20:00Z',
      icon: 'Compass',
      color: 'accent',
      link: '/career-exploration',
      metadata: {
        career: 'Software Engineering',
        matchScore: '92%'
      }
    },
    {
      id: 4,
      type: 'ai_conversation',
      title: 'AI Consultation',
      description: 'Asked about engineering entrance exams',
      timestamp: '2024-09-11T16:15:00Z',
      icon: 'MessageCircle',
      color: 'warning',
      link: '/ai-chat-assistant',
      metadata: {
        topic: 'Engineering Entrance Exams',
        duration: '5 min'
      }
    },
    {
      id: 5,
      type: 'deadline_added',
      title: 'Deadline Tracked',
      description: 'Added JEE Main registration deadline',
      timestamp: '2024-09-11T09:30:00Z',
      icon: 'Calendar',
      color: 'success',
      link: '/timeline-tracker',
      metadata: {
        exam: 'JEE Main 2025',
        deadline: '2024-09-30'
      }
    },
    {
      id: 6,
      type: 'college_compared',
      title: 'Colleges Compared',
      description: 'Compared NIT Srinagar vs IIIT Allahabad',
      timestamp: '2024-09-10T13:45:00Z',
      icon: 'GitCompare',
      color: 'primary',
      link: '/college-details',
      metadata: {
        colleges: ['NIT Srinagar', 'IIIT Allahabad'],
        criteria: 'Placement & Fees'
      }
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        icon: 'text-primary'
      },
      secondary: {
        bg: 'bg-secondary/10',
        text: 'text-secondary',
        icon: 'text-secondary'
      },
      accent: {
        bg: 'bg-accent/10',
        text: 'text-accent',
        icon: 'text-accent'
      },
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        icon: 'text-success'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        icon: 'text-warning'
      }
    };
    return colors?.[color] || colors?.primary;
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor((now - activityTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getActivityTypeLabel = (type) => {
    const labels = {
      college_saved: 'College',
      assessment_progress: 'Assessment',
      career_explored: 'Career',
      ai_conversation: 'AI Chat',
      deadline_added: 'Timeline',
      college_compared: 'Research'
    };
    return labels?.[type] || 'Activity';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">Your latest actions and progress</p>
        </div>
        <Button variant="ghost" size="sm" iconName="RotateCcw" iconSize={16}>
          Refresh
        </Button>
      </div>
      {/* Activity Timeline */}
      <div className="space-y-4">
        {activities?.map((activity, index) => {
          const colorClasses = getColorClasses(activity?.color);
          const isLast = index === activities?.length - 1;
          
          return (
            <div key={activity?.id} className="relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-5 top-12 w-0.5 h-16 bg-border/40" />
              )}
              <div className="flex items-start space-x-4">
                {/* Activity Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colorClasses?.bg} shrink-0`}>
                  <Icon
                    name={activity?.icon}
                    size={18}
                    className={colorClasses?.icon}
                  />
                </div>

                {/* Activity Content */}
                <div className="flex-1 glass-card rounded-xl border border-border/40 p-4 transition-all duration-300 hover:shadow-elevation-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      {/* Header */}
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-foreground">{activity?.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${colorClasses?.bg} ${colorClasses?.text}`}>
                          {getActivityTypeLabel(activity?.type)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground">{activity?.description}</p>

                      {/* Metadata */}
                      {activity?.metadata && (
                        <div className="flex flex-wrap gap-2 text-xs">
                          {Object.entries(activity?.metadata)?.map(([key, value]) => (
                            <span key={key} className="px-2 py-1 bg-muted rounded text-muted-foreground">
                              {key === 'colleges' && Array.isArray(value) 
                                ? value?.join(' vs ') 
                                : `${key}: ${value}`}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timestamp & Action */}
                    <div className="text-right space-y-2 shrink-0 ml-4">
                      <p className="text-xs text-muted-foreground">
                        {getRelativeTime(activity?.timestamp)}
                      </p>
                      <Link to={activity?.link}>
                        <Button variant="ghost" size="sm" iconName="ArrowRight" iconSize={14}>
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Load More */}
      <div className="text-center pt-4">
        <Button variant="outline" iconName="MoreHorizontal" iconPosition="left">
          Load More Activities
        </Button>
      </div>
      {/* Activity Summary */}
      <div className="glass-card rounded-xl border border-border/40 p-4 bg-gradient-to-r from-muted/20 to-muted/10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-semibold text-foreground">This Week's Summary</h4>
            <p className="text-sm text-muted-foreground">
              You've been quite active! Keep up the great progress.
            </p>
          </div>
          <div className="flex space-x-4 text-center">
            <div>
              <p className="text-lg font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Actions</p>
            </div>
            <div>
              <p className="text-lg font-bold text-secondary">5</p>
              <p className="text-xs text-muted-foreground">Colleges</p>
            </div>
            <div>
              <p className="text-lg font-bold text-accent">3</p>
              <p className="text-xs text-muted-foreground">Careers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;