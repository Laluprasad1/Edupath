import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CareerFilters = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    salaryRange: activeFilters?.salaryRange || '',
    educationLevel: activeFilters?.educationLevel || '',
    workEnvironment: activeFilters?.workEnvironment || [],
    skills: activeFilters?.skills || [],
    location: activeFilters?.location || '',
    experience: activeFilters?.experience || '',
    ...activeFilters
  });

  const salaryRanges = [
    { value: '0-3', label: '₹0 - 3 LPA' },
    { value: '3-6', label: '₹3 - 6 LPA' },
    { value: '6-10', label: '₹6 - 10 LPA' },
    { value: '10-15', label: '₹10 - 15 LPA' },
    { value: '15-25', label: '₹15 - 25 LPA' },
    { value: '25+', label: '₹25+ LPA' }
  ];

  const educationLevels = [
    { value: 'diploma', label: 'Diploma/Certificate' },
    { value: 'undergraduate', label: 'Undergraduate Degree' },
    { value: 'postgraduate', label: 'Postgraduate Degree' },
    { value: 'professional', label: 'Professional Course' },
    { value: 'doctorate', label: 'Doctorate/PhD' }
  ];

  const workEnvironments = [
    { id: 'office', label: 'Office Environment', icon: 'Building' },
    { id: 'remote', label: 'Remote Work', icon: 'Home' },
    { id: 'field', label: 'Field Work', icon: 'MapPin' },
    { id: 'laboratory', label: 'Laboratory', icon: 'Microscope' },
    { id: 'hospital', label: 'Hospital/Clinic', icon: 'Heart' },
    { id: 'creative', label: 'Creative Studio', icon: 'Palette' }
  ];

  const skillCategories = [
    { id: 'analytical', label: 'Analytical Thinking', icon: 'Brain' },
    { id: 'creative', label: 'Creative Skills', icon: 'Lightbulb' },
    { id: 'communication', label: 'Communication', icon: 'MessageCircle' },
    { id: 'technical', label: 'Technical Skills', icon: 'Code' },
    { id: 'leadership', label: 'Leadership', icon: 'Users' },
    { id: 'problem-solving', label: 'Problem Solving', icon: 'Puzzle' }
  ];

  const locations = [
    { value: 'jammu', label: 'Jammu' },
    { value: 'srinagar', label: 'Srinagar' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'anywhere', label: 'Anywhere in India' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5+ years)' },
    { value: 'executive', label: 'Executive Level' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCheckboxChange = (category, itemId, checked) => {
    const currentItems = filters?.[category] || [];
    const newItems = checked 
      ? [...currentItems, itemId]
      : currentItems?.filter(id => id !== itemId);
    
    handleFilterChange(category, newItems);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      salaryRange: '',
      educationLevel: '',
      workEnvironment: [],
      skills: [],
      location: '',
      experience: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.salaryRange) count++;
    if (filters?.educationLevel) count++;
    if (filters?.workEnvironment?.length > 0) count++;
    if (filters?.skills?.length > 0) count++;
    if (filters?.location) count++;
    if (filters?.experience) count++;
    return count;
  };

  return (
    <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
      {/* Filter Header */}
      <div className="p-4 border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Icon name="Filter" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Filter Careers</h3>
              <p className="text-sm text-muted-foreground">
                {getActiveFilterCount()} filters active
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconSize={16}
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              {isExpanded ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-6">
          {/* Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Salary Range"
              placeholder="Select salary range"
              options={salaryRanges}
              value={filters?.salaryRange}
              onChange={(value) => handleFilterChange('salaryRange', value)}
              className="w-full"
            />
            
            <Select
              label="Education Level"
              placeholder="Select education level"
              options={educationLevels}
              value={filters?.educationLevel}
              onChange={(value) => handleFilterChange('educationLevel', value)}
              className="w-full"
            />
            
            <Select
              label="Preferred Location"
              placeholder="Select location"
              options={locations}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
              className="w-full"
            />
            
            <Select
              label="Experience Level"
              placeholder="Select experience level"
              options={experienceLevels}
              value={filters?.experience}
              onChange={(value) => handleFilterChange('experience', value)}
              className="w-full"
            />
          </div>

          {/* Work Environment */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Work Environment</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {workEnvironments?.map((env) => (
                <div key={env.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters?.workEnvironment?.includes(env.id) || false}
                    onChange={(e) => handleCheckboxChange('workEnvironment', env.id, e?.target?.checked)}
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={env.icon} size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{env.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Required Skills</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillCategories?.map((skill) => (
                <div key={skill?.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters?.skills?.includes(skill?.id) || false}
                    onChange={(e) => handleCheckboxChange('skills', skill?.id, e?.target?.checked)}
                  />
                  <div className="flex items-center space-x-2">
                    <Icon name={skill?.icon} size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{skill?.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Quick Filters</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'High Demand', key: 'highDemand' },
                { label: 'Remote Friendly', key: 'remoteFriendly' },
                { label: 'Government Jobs', key: 'government' },
                { label: 'Startup Culture', key: 'startup' },
                { label: 'Creative Field', key: 'creative' },
                { label: 'Technical Role', key: 'technical' }
              ]?.map((tag) => (
                <button
                  key={tag?.key}
                  onClick={() => handleFilterChange(tag?.key, !filters?.[tag?.key])}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters?.[tag?.key]
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  {tag?.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerFilters;