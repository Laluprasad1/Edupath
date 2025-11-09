import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ events, onEventUpdate, selectedFilters }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredEvents = events?.filter(event => {
    if (selectedFilters?.length === 0) return true;
    return selectedFilters?.includes(event?.category);
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)?.getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)?.getDay();
  };

  const getEventsForDate = (date) => {
    const dateStr = date?.toDateString();
    return filteredEvents?.filter(event => 
      new Date(event.deadline)?.toDateString() === dateStr
    );
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate?.setMonth(prev?.getMonth() + direction);
      return newDate;
    });
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const formatMonthYear = (date) => {
    return date?.toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date?.toDateString() === selectedDate?.toDateString();
  };

  const getEventColor = (category) => {
    const colors = {
      admission: 'bg-primary',
      scholarship: 'bg-success',
      exam: 'bg-warning',
      document: 'bg-accent',
      interview: 'bg-secondary',
      result: 'bg-error'
    };
    return colors?.[category] || 'bg-primary';
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days?.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days?.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            {formatMonthYear(currentDate)}
          </h2>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            iconSize={14}
            onClick={goToToday}
          >
            Today
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            iconSize={16}
            onClick={() => navigateMonth(-1)}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
            onClick={() => navigateMonth(1)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl border border-border/40 p-4">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays?.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days?.map((date, index) => {
                if (!date) {
                  return <div key={index} className="p-2 h-20"></div>;
                }

                const dayEvents = getEventsForDate(date);
                const hasEvents = dayEvents?.length > 0;

                return (
                  <div
                    key={index}
                    className={`p-2 h-20 border border-border/20 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/5 ${
                      isToday(date) ? 'bg-primary/10 border-primary/40' : isSelected(date) ?'bg-accent/10 border-accent/40': hasEvents ?'bg-muted/50' : ''
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="flex flex-col h-full">
                      <span className={`text-sm font-medium ${
                        isToday(date) ? 'text-primary' : isSelected(date) ?'text-accent': 'text-foreground'
                      }`}>
                        {date?.getDate()}
                      </span>
                      
                      {hasEvents && (
                        <div className="flex-1 mt-1 space-y-1">
                          {dayEvents?.slice(0, 2)?.map((event, idx) => (
                            <div
                              key={idx}
                              className={`w-full h-1.5 rounded-full ${getEventColor(event?.category)}`}
                            />
                          ))}
                          {dayEvents?.length > 2 && (
                            <div className="text-xs text-muted-foreground text-center">
                              +{dayEvents?.length - 2}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Date Events */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl border border-border/40 p-4">
            <h3 className="font-semibold text-foreground mb-4">
              {selectedDate 
                ? `Events for ${selectedDate?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`
                : 'Select a date'
              }
            </h3>

            {selectedDate ? (
              selectedDateEvents?.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents?.map(event => (
                    <div key={event?.id} className="p-3 rounded-lg bg-muted/50 border border-border/20">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">{event?.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={event?.completed ? 'CheckCircle' : 'Circle'}
                          iconSize={14}
                          onClick={() => onEventUpdate(event?.id, { completed: !event?.completed })}
                          className={event?.completed ? 'text-success' : 'text-muted-foreground hover:text-success'}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{event?.institution}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          event?.category === 'admission' ? 'bg-primary/10 text-primary' :
                          event?.category === 'scholarship' ? 'bg-success/10 text-success' :
                          event?.category === 'exam'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                        }`}>
                          {event?.category?.charAt(0)?.toUpperCase() + event?.category?.slice(1)}
                        </span>
                        {event?.priority === 'high' && (
                          <span className="text-xs px-2 py-1 rounded-full bg-error/10 text-error">
                            High Priority
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No events on this date</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <Icon name="MousePointer" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click on a date to view events</p>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="glass-card rounded-xl border border-border/40 p-4 mt-4">
            <h4 className="font-medium text-foreground mb-3">Event Categories</h4>
            <div className="space-y-2">
              {[
                { category: 'admission', label: 'Admissions', color: 'bg-primary' },
                { category: 'scholarship', label: 'Scholarships', color: 'bg-success' },
                { category: 'exam', label: 'Exams', color: 'bg-warning' },
                { category: 'document', label: 'Documents', color: 'bg-accent' },
                { category: 'interview', label: 'Interviews', color: 'bg-secondary' },
                { category: 'result', label: 'Results', color: 'bg-error' }
              ]?.map(item => (
                <div key={item?.category} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${item?.color}`}></div>
                  <span className="text-sm text-muted-foreground">{item?.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;