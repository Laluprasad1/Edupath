import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineView = ({ events, onEventUpdate, selectedFilters }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const filteredEvents = events?.filter(event => {
    if (selectedFilters?.length === 0) return true;
    return selectedFilters?.includes(event?.category);
  });

  const sortedEvents = filteredEvents?.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const getEventIcon = (category) => {
    const icons = {
      admission: 'GraduationCap',
      scholarship: 'Award',
      exam: 'BookOpen',
      document: 'FileText',
      interview: 'Users',
      result: 'Trophy'
    };
    return icons?.[category] || 'Calendar';
  };

  const getEventColor = (category) => {
    const colors = {
      admission: 'primary',
      scholarship: 'success',
      exam: 'warning',
      document: 'accent',
      interview: 'secondary',
      result: 'error'
    };
    return colors?.[category] || 'primary';
  };

  const getCategoryBg = (category) => {
    const backgrounds = {
      admission: 'bg-primary/10 text-primary',
      scholarship: 'bg-success/10 text-success',
      exam: 'bg-warning/10 text-warning',
      document: 'bg-accent/10 text-accent',
      interview: 'bg-secondary/10 text-secondary',
      result: 'bg-error/10 text-error'
    };
    return backgrounds?.[category] || 'bg-primary/10 text-primary';
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDeadline = (deadline) => {
    return new Date(deadline)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleToggleComplete = (eventId) => {
    onEventUpdate(eventId, { completed: !events?.find(e => e?.id === eventId)?.completed });
  };

  const toggleEventExpansion = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="space-y-6">
      {sortedEvents?.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Events Found</h3>
          <p className="text-muted-foreground">
            {selectedFilters?.length > 0 
              ? 'No events match your selected filters.' :'No upcoming events in your timeline.'}
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          {sortedEvents?.map((event, index) => {
            const daysUntil = getDaysUntilDeadline(event?.deadline);
            const isExpanded = expandedEvent === event?.id;
            const isOverdue = daysUntil < 0;
            const isUrgent = daysUntil <= 7 && daysUntil >= 0;
            
            return (
              <div key={event?.id} className="relative flex items-start space-x-4 pb-8">
                {/* Timeline Node */}
                <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-background ${
                  event?.completed 
                    ? 'bg-success text-success-foreground' 
                    : isOverdue 
                    ? 'bg-error text-error-foreground'
                    : isUrgent
                    ? 'bg-warning text-warning-foreground'
                    : `bg-${getEventColor(event?.category)} text-${getEventColor(event?.category)}-foreground`
                }`}>
                  <Icon 
                    name={event?.completed ? 'Check' : getEventIcon(event?.category)} 
                    size={20} 
                  />
                </div>
                {/* Event Card */}
                <div className="flex-1 min-w-0">
                  <div 
                    className={`glass-card rounded-xl border border-border/40 p-4 transition-all duration-300 cursor-pointer hover:shadow-elevation-2 ${
                      isExpanded ? 'shadow-elevation-2' : ''
                    } ${
                      isOverdue ? 'border-error/40 bg-error/5' : isUrgent ?'border-warning/40 bg-warning/5' :
                      event?.completed ? 'border-success/40 bg-success/5' : ''
                    }`}
                    onClick={() => toggleEventExpansion(event?.id)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryBg(event?.category)}`}>
                            {event?.category?.charAt(0)?.toUpperCase() + event?.category?.slice(1)}
                          </span>
                          {event?.priority === 'high' && (
                            <span className="text-xs px-2 py-1 rounded-full bg-error/10 text-error font-medium">
                              High Priority
                            </span>
                          )}
                        </div>
                        <h3 className={`font-semibold text-foreground ${event?.completed ? 'line-through opacity-60' : ''}`}>
                          {event?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{event?.institution}</p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={event?.completed ? 'CheckCircle' : 'Circle'}
                          iconSize={16}
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleToggleComplete(event?.id);
                          }}
                          className={event?.completed ? 'text-success' : 'text-muted-foreground hover:text-success'}
                        />
                        <Icon 
                          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                          size={16} 
                          className="text-muted-foreground"
                        />
                      </div>
                    </div>

                    {/* Deadline Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {formatDeadline(event?.deadline)}
                        </span>
                      </div>
                      <div className={`text-sm font-medium ${
                        isOverdue ? 'text-error' : isUrgent ?'text-warning' :
                        daysUntil <= 30 ? 'text-accent' : 'text-muted-foreground'
                      }`}>
                        {isOverdue 
                          ? `${Math.abs(daysUntil)} days overdue`
                          : daysUntil === 0 
                          ? 'Due today'
                          : `${daysUntil} days left`
                        }
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {event?.progress !== undefined && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">{event?.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              event?.completed ? 'bg-success' :
                              event?.category === 'admission' ? 'bg-primary' :
                              event?.category === 'scholarship' ? 'bg-success' :
                              event?.category === 'exam'? 'bg-warning' : 'bg-accent'
                            }`}
                            style={{ width: `${event?.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-border/40 pt-3 space-y-3">
                        {event?.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {event?.description}
                          </p>
                        )}

                        {event?.requirements && event?.requirements?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Required Documents:</h4>
                            <div className="space-y-1">
                              {event?.requirements?.map((req, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm">
                                  <Icon name="FileText" size={12} className="text-muted-foreground" />
                                  <span className="text-muted-foreground">{req}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {event?.checklist && event?.checklist?.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Checklist:</h4>
                            <div className="space-y-2">
                              {event?.checklist?.map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <Icon 
                                    name={item?.completed ? 'CheckCircle' : 'Circle'} 
                                    size={14} 
                                    className={item?.completed ? 'text-success' : 'text-muted-foreground'}
                                  />
                                  <span className={`text-sm ${item?.completed ? 'line-through opacity-60' : 'text-muted-foreground'}`}>
                                    {item?.task}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Bell"
                            iconPosition="left"
                            iconSize={14}
                          >
                            Set Reminder
                          </Button>
                          {event?.applicationUrl && (
                            <Button
                              variant="default"
                              size="sm"
                              iconName="ExternalLink"
                              iconPosition="right"
                              iconSize={14}
                            >
                              Apply Now
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimelineView;