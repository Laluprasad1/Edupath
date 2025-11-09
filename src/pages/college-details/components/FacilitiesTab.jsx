import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FacilitiesTab = ({ facilities }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Facilities', icon: 'Grid3X3' },
    { id: 'academic', label: 'Academic', icon: 'BookOpen' },
    { id: 'sports', label: 'Sports & Recreation', icon: 'Trophy' },
    { id: 'accommodation', label: 'Accommodation', icon: 'Home' },
    { id: 'dining', label: 'Dining', icon: 'Coffee' },
    { id: 'transport', label: 'Transport', icon: 'Bus' },
    { id: 'medical', label: 'Medical', icon: 'Heart' },
    { id: 'technology', label: 'Technology', icon: 'Laptop' }
  ];

  const filteredFacilities = selectedCategory === 'all' 
    ? facilities 
    : facilities?.filter(facility => facility?.category === selectedCategory);

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      const currentFacility = filteredFacilities?.find(f => f?.images && f?.images?.length > 0);
      if (currentFacility) {
        setSelectedImageIndex((selectedImageIndex + 1) % currentFacility?.images?.length);
      }
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      const currentFacility = filteredFacilities?.find(f => f?.images && f?.images?.length > 0);
      if (currentFacility) {
        setSelectedImageIndex(
          selectedImageIndex === 0 ? currentFacility?.images?.length - 1 : selectedImageIndex - 1
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities?.map((facility) => (
          <div
            key={facility?.id}
            className="glass-card rounded-lg border border-border/40 overflow-hidden hover:shadow-elevation-2 transition-all duration-300"
          >
            {/* Facility Image */}
            {facility?.image && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={facility?.image}
                  alt={facility?.name}
                  className="w-full h-full object-cover"
                />
                {facility?.images && facility?.images?.length > 1 && (
                  <button
                    onClick={() => openImageModal(0)}
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Icon name="Images" size={16} />
                  </button>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    facility?.status === 'excellent' ? 'bg-success/20 text-success' :
                    facility?.status === 'good' ? 'bg-primary/20 text-primary' :
                    facility?.status === 'average'? 'bg-warning/20 text-warning' : 'bg-muted/20 text-muted-foreground'
                  }`}>
                    {facility?.status}
                  </span>
                </div>
              </div>
            )}

            {/* Facility Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-foreground">{facility?.name}</h3>
                <Icon name={facility?.icon} size={20} className="text-primary" />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {facility?.description}
              </p>

              {/* Features */}
              {facility?.features && facility?.features?.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Key Features
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {facility?.features?.slice(0, 3)?.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {facility?.features?.length > 3 && (
                      <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded-md text-xs">
                        +{facility?.features?.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Capacity/Timing */}
              {(facility?.capacity || facility?.timing) && (
                <div className="flex items-center justify-between text-sm">
                  {facility?.capacity && (
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Users" size={14} />
                      <span>{facility?.capacity}</span>
                    </div>
                  )}
                  {facility?.timing && (
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{facility?.timing}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Rating */}
              {facility?.rating && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < Math.floor(facility?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {facility?.rating}/5 ({facility?.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Virtual Tour Section */}
      <div className="glass-card rounded-lg border border-border/40 p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Take a Virtual Tour</h3>
            <p className="text-sm text-muted-foreground">
              Explore our campus facilities from the comfort of your home
            </p>
          </div>
          <Button
            variant="default"
            iconName="Play"
            iconPosition="left"
          >
            Start Tour
          </Button>
        </div>
      </div>
      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-300 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors z-10"
            >
              <Icon name="X" size={20} />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <Icon name="ChevronRight" size={20} />
            </button>

            {/* Image */}
            <Image
              src={filteredFacilities?.[0]?.images?.[selectedImageIndex] || ''}
              alt="Facility view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
      {filteredFacilities?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Facilities Found</h3>
          <p className="text-muted-foreground">Try selecting a different category to see more facilities.</p>
        </div>
      )}
    </div>
  );
};

export default FacilitiesTab;