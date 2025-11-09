import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollegeHeader = ({ college, onBookmark, onShare, isBookmarked }) => {
  return (
    <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
      {/* Hero Image */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <Image
          src={college?.heroImage}
          alt={`${college?.name} campus view`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
            onClick={onBookmark}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            onClick={onShare}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          />
        </div>

        {/* College Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">{college?.name}</h1>
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{college?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Est. {college?.establishedYear}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* College Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Accreditation & Rankings */}
            <div className="flex flex-wrap gap-2">
              {college?.accreditations?.map((accreditation, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm"
                >
                  <Icon name="Shield" size={14} />
                  <span>{accreditation}</span>
                </div>
              ))}
              {college?.ranking && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  <Icon name="Trophy" size={14} />
                  <span>Rank #{college?.ranking}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {college?.description}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{college?.totalStudents?.toLocaleString('en-IN')}</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">{college?.facultyCount}</div>
                <div className="text-sm text-muted-foreground">Faculty</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent">{college?.coursesOffered}</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-success">{college?.placementRate}%</div>
                <div className="text-sm text-muted-foreground">Placement</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{college?.fullAddress}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{college?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{college?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Globe" size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <a 
                    href={college?.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-4 border-t border-border/40">
              <Button
                variant="default"
                fullWidth
                iconName="Phone"
                iconPosition="left"
              >
                Call Now
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Mail"
                iconPosition="left"
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeHeader;