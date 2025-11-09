import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = () => {
  const deadlines = [
    {
      id: 1,
      title: 'JEE Main Registration',
      description: 'Last date for JEE Main 2025 registration',
      date: '2024-09-30',
      daysLeft: 17,
      type: 'exam',
      priority: 'high',
      status: 'pending',
      link: '/timeline-tracker'
    },
    {
      id: 2,
      title: 'NEET Application',
      description: 'NEET 2025 application form submission',
      date: '2024-10-15',
      daysLeft: 32,
      type: 'exam',
      priority: 'high',
      status: 'pending',
      link: '/timeline-tracker'
    },
    {
      id: 3,
      title: 'Kashmir University Admission',
      description: 'University of Kashmir UG admission forms',
      date: '2024-10-05',
      daysLeft: 22,
      type: 'admission',
      priority: 'medium',
      status: 'pending',
      link: '/college-details'
    },
    {
      id: 4,
      title: 'Merit Scholarship',
      description: 'J&K Merit Scholarship application deadline',
      date: '2024-09-25',
      daysLeft: 12,
      type: 'scholarship',
      priority: 'high',
      status: 'pending',
      link: '/timeline-tracker'
    },
    {
      id: 5,
      title: 'Document Verification',
      description: 'Submit Class 12 marksheet verification',
      date: '2024-09-20',
      daysLeft: 7,
      type: 'document',
      priority: 'medium',
      status: 'in-progress',
      link: '/timeline-tracker'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-error/10',
          text: 'text-error',
          border: 'border-error/20',
          dot: 'bg-error'
        };
      case 'medium':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          border: 'border-warning/20',
          dot: 'bg-warning'
        };
      default:
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          border: 'border-success/20',
          dot: 'bg-success'
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'exam':
        return 'FileText';
      case 'admission':
        return 'GraduationCap';
      case 'scholarship':
        return 'Award';
      case 'document':
        return 'File';
      default:
        return 'Calendar';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const urgentDeadlines = deadlines?.filter(d => d?.daysLeft <= 15);
  const upcomingDeadlines = deadlines?.filter(d => d?.daysLeft > 15);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Upcoming Deadlines</h2>
          <p className="text-sm text-muted-foreground">Stay on top of important dates</p>
        </div>
        <Link to="/timeline-tracker">
          <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
            View All
          </Button>
        </Link>
      </div>
      {/* Urgent Deadlines Alert */}
      {urgentDeadlines?.length > 0 && (
        <div className="glass-card rounded-xl border border-error/40 p-4 bg-error/5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-error/10">
              <Icon name="AlertTriangle" size={16} className="text-error" />
            </div>
            <div>
              <h3 className="font-semibold text-error">Urgent Deadlines</h3>
              <p className="text-sm text-muted-foreground">
                {urgentDeadlines?.length} deadline{urgentDeadlines?.length > 1 ? 's' : ''} approaching
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            {urgentDeadlines?.slice(0, 2)?.map((deadline) => (
              <div key={deadline?.id} className="flex items-center justify-between p-2 rounded-lg bg-background/50">
                <div className="flex items-center space-x-3">
                  <Icon name={getTypeIcon(deadline?.type)} size={16} className="text-error" />
                  <div>
                    <p className="font-medium text-sm text-foreground">{deadline?.title}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(deadline?.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-error">{deadline?.daysLeft} days</p>
                  <p className="text-xs text-muted-foreground">remaining</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Deadlines List */}
      <div className="space-y-3">
        {deadlines?.slice(0, 5)?.map((deadline) => {
          const priorityColors = getPriorityColor(deadline?.priority);
          
          return (
            <div
              key={deadline?.id}
              className="glass-card rounded-xl border border-border/40 p-4 transition-all duration-300 hover:shadow-elevation-2 animate-scale-hover"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Type Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                    <Icon
                      name={getTypeIcon(deadline?.type)}
                      size={20}
                      className="text-muted-foreground"
                    />
                  </div>

                  {/* Deadline Info */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{deadline?.title}</h3>
                      <div className={`w-2 h-2 rounded-full ${priorityColors?.dot}`} />
                    </div>
                    <p className="text-sm text-muted-foreground">{deadline?.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-muted-foreground">
                        Due: {formatDate(deadline?.date)}
                      </span>
                      <span className={`capitalize ${getStatusColor(deadline?.status)}`}>
                        {deadline?.status?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Days Left & Action */}
                <div className="text-right space-y-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors?.bg} ${priorityColors?.text}`}>
                    {deadline?.daysLeft} days left
                  </div>
                  <Link to={deadline?.link}>
                    <Button variant="ghost" size="sm" iconName="ArrowRight" iconSize={14}>
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All CTA */}
      <div className="text-center pt-4">
        <Link to="/timeline-tracker">
          <Button variant="outline" iconName="Calendar" iconPosition="left">
            View Complete Timeline
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;