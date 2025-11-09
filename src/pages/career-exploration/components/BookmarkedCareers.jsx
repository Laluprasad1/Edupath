import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookmarkedCareers = ({ bookmarkedCareers = [], onRemoveBookmark, onCareerSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (bookmarkedCareers?.length === 0) {
    return (
      <div className="glass-card rounded-xl border border-border/40 p-6 text-center">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Bookmark" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No Bookmarked Careers</h3>
        <p className="text-sm text-muted-foreground">
          Start exploring careers and bookmark the ones that interest you
        </p>
      </div>
    );
  }

  const displayedCareers = isExpanded ? bookmarkedCareers : bookmarkedCareers?.slice(0, 3);

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-success';
      case 'High': return 'text-primary';
      case 'Medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/40 bg-gradient-to-r from-accent/5 to-warning/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
              <Icon name="Bookmark" size={16} className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Bookmarked Careers</h3>
              <p className="text-sm text-muted-foreground">
                {bookmarkedCareers?.length} career{bookmarkedCareers?.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>
          {bookmarkedCareers?.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? 'Show Less' : 'Show All'}
            </Button>
          )}
        </div>
      </div>
      {/* Bookmarked Careers List */}
      <div className="divide-y divide-border/40">
        {displayedCareers?.map((career, index) => (
          <div
            key={index}
            className="p-4 hover:bg-accent/5 transition-colors cursor-pointer group"
            onClick={() => onCareerSelect(career)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {career?.name}
                  </h4>
                  <Icon 
                    name="ExternalLink" 
                    size={14} 
                    className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" 
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-success">{career?.salary}</span>
                  <span className={`text-sm ${getDemandColor(career?.demand)}`}>
                    {career?.demand} Demand
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {career?.stream || 'Technology'}
                  </div>
                  <div className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                    {career?.category || 'Engineering'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="BookmarkCheck"
                  iconSize={16}
                  onClick={(e) => {
                    e?.stopPropagation();
                    onRemoveBookmark(career);
                  }}
                  className="text-accent hover:text-accent/80"
                />
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Footer Actions */}
      {bookmarkedCareers?.length > 0 && (
        <div className="p-4 border-t border-border/40 bg-muted/20">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="flex-1"
            >
              Export List
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              className="flex-1"
            >
              Share List
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkedCareers;