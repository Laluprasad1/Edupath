import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ college }) => {
  const mapSrc = `https://www.google.com/maps?q=${college?.coordinates?.lat},${college?.coordinates?.lng}&z=14&output=embed`;

  return (
    <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Location & Directions</h3>
            <p className="text-sm text-muted-foreground">{college?.fullAddress}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Navigation"
            iconPosition="left"
          >
            Get Directions
          </Button>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-80">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`${college?.name} Location`}
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
          className="border-0"
        />
      </div>
      {/* Nearby Amenities */}
      <div className="p-4 border-t border-border/40">
        <h4 className="font-medium text-foreground mb-3">Nearby Amenities</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {college?.nearbyAmenities?.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-2 bg-muted/30 rounded-lg"
            >
              <Icon name={amenity?.icon} size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{amenity?.name}</p>
                <p className="text-xs text-muted-foreground">{amenity?.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Transportation */}
      <div className="p-4 border-t border-border/40">
        <h4 className="font-medium text-foreground mb-3">Transportation</h4>
        <div className="space-y-2">
          {college?.transportation?.map((transport, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Icon name={transport?.icon} size={18} className="text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{transport?.type}</p>
                  <p className="text-xs text-muted-foreground">{transport?.description}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-primary">{transport?.distance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;