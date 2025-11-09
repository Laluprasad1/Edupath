import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProgramsTab = ({ programs }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts & Humanities' },
    { value: 'science', label: 'Science' },
    { value: 'management', label: 'Management' }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' }
  ];

  const filteredPrograms = programs?.filter(program => {
    const categoryMatch = selectedCategory === 'all' || program?.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || program?.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const formatFee = (fee) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(fee);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          className="flex-1"
        />
        <Select
          label="Level"
          options={levelOptions}
          value={selectedLevel}
          onChange={setSelectedLevel}
          className="flex-1"
        />
      </div>
      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms?.map((program) => (
          <div
            key={program?.id}
            className="glass-card rounded-lg border border-border/40 p-6 hover:shadow-elevation-2 transition-all duration-300"
          >
            {/* Program Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{program?.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="GraduationCap" size={14} />
                    <span>{program?.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{program?.duration}</span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                program?.availability === 'available' ?'bg-success/10 text-success'
                  : program?.availability === 'limited' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
              }`}>
                {program?.availability === 'available' ? 'Available' : 
                 program?.availability === 'limited' ? 'Limited Seats' : 'Full'}
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-4">
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {program?.description}
              </p>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Annual Fee</p>
                  <p className="text-lg font-bold text-primary">{formatFee(program?.annualFee)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Seats</p>
                  <p className="text-lg font-bold text-secondary">{program?.totalSeats}</p>
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Eligibility Criteria</p>
                <div className="space-y-1">
                  {program?.eligibility?.map((criteria, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              {program?.specializations && program?.specializations?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Specializations Available</p>
                  <div className="flex flex-wrap gap-2">
                    {program?.specializations?.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="FileText"
                  iconPosition="left"
                  className="flex-1"
                >
                  View Syllabus
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  className="flex-1"
                >
                  Brochure
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredPrograms?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Programs Found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more programs.</p>
        </div>
      )}
    </div>
  );
};

export default ProgramsTab;