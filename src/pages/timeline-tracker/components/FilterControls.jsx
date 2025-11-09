import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterControls = ({ 
  selectedFilters, 
  onFilterChange, 
  viewMode, 
  onViewModeChange,
  onAddEvent,
  eventCounts = {}
}) => {
  const filterOptions = [
    {
      id: 'admission',
      label: 'Admissions',
      icon: 'GraduationCap',
      color: 'primary',
      count: eventCounts?.admission || 0
    },
    {
      id: 'scholarship',
      label: 'Scholarships',
      icon: 'Award',
      color: 'success',
      count: eventCounts?.scholarship || 0
    },
    {
      id: 'exam',
      label: 'Exams',
      icon: 'BookOpen',
      color: 'warning',
      count: eventCounts?.exam || 0
    },
    {
      id: 'document',
      label: 'Documents',
      icon: 'FileText',
      color: 'accent',
      count: eventCounts?.document || 0
    },
    {
      id: 'interview',
      label: 'Interviews',
      icon: 'Users',
      color: 'secondary',
      count: eventCounts?.interview || 0
    },
    {
      id: 'result',
      label: 'Results',
      icon: 'Trophy',
      color: 'error',
      count: eventCounts?.result || 0
    }
  ];

  const handleFilterToggle = (filterId) => {
    const newFilters = selectedFilters?.includes(filterId)
      ? selectedFilters?.filter(f => f !== filterId)
      : [...selectedFilters, filterId];
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  const selectAllFilters = () => {
    onFilterChange(filterOptions?.map(f => f?.id));
  };

  const getColorClasses = (color, isSelected) => {
    const colors = {
      primary: isSelected ? 'bg-primary text-primary-foreground border-primary' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
      success: isSelected ? 'bg-success text-success-foreground border-success' : 'bg-success/10 text-success border-success/20 hover:bg-success/20',
      warning: isSelected ? 'bg-warning text-warning-foreground border-warning' : 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20',
      accent: isSelected ? 'bg-accent text-accent-foreground border-accent' : 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20',
      secondary: isSelected ? 'bg-secondary text-secondary-foreground border-secondary' : 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20',
      error: isSelected ? 'bg-error text-error-foreground border-error' : 'bg-error/10 text-error border-error/20 hover:bg-error/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground">Timeline Tracker</h3>
          <span className="text-sm text-muted-foreground">
            ({selectedFilters?.length === 0 ? 'All' : selectedFilters?.length} categories)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'timeline' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              iconPosition="left"
              iconSize={14}
              onClick={() => onViewModeChange('timeline')}
              className="rounded-md"
            >
              Timeline
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              iconSize={14}
              onClick={() => onViewModeChange('calendar')}
              className="rounded-md"
            >
              Calendar
            </Button>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            onClick={onAddEvent}
          >
            Add Event
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="glass-card rounded-xl border border-border/40 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Filter by Category</h4>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={selectAllFilters}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map(filter => {
            const isSelected = selectedFilters?.includes(filter?.id);
            const colorClasses = getColorClasses(filter?.color, isSelected);
            
            return (
              <button
                key={filter?.id}
                onClick={() => handleFilterToggle(filter?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${colorClasses}`}
              >
                <Icon name={filter?.icon} size={14} />
                <span className="text-sm font-medium">{filter?.label}</span>
                {filter?.count > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected 
                      ? 'bg-white/20 text-current' :'bg-current/20 text-current'
                  }`}>
                    {filter?.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary */}
        {selectedFilters?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/40">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Showing {selectedFilters?.length} of {filterOptions?.length} categories
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconSize={12}
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg border border-border/40 p-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Icon name="Calendar" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {Object.values(eventCounts)?.reduce((a, b) => a + b, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Events</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg border border-border/40 p-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-warning/10">
              <Icon name="Clock" size={16} className="text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {eventCounts?.urgent || 0}
              </p>
              <p className="text-xs text-muted-foreground">Due Soon</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg border border-border/40 p-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {eventCounts?.completed || 0}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg border border-border/40 p-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-error/10">
              <Icon name="AlertCircle" size={16} className="text-error" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {eventCounts?.overdue || 0}
              </p>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;