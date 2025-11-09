import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CareerDetailPanel = ({ career, onClose, onBookmark, isBookmarked = false }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!career) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Select a Career</h3>
            <p className="text-sm text-muted-foreground">
              Choose a career from the tree to view detailed information
            </p>
          </div>
        </div>
      </div>
    );
  }

  const mockCareerData = {
    name: career?.name || 'Software Engineer',
    salary: career?.salary || '₹6-25 LPA',
    growth: career?.growth || 'High',
    demand: career?.demand || 'Very High',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    description: `A ${career?.name} is responsible for designing, developing, and maintaining software applications and systems. This role involves working with various programming languages, frameworks, and tools to create efficient and scalable solutions.`,
    dayInLife: [
      { time: '9:00 AM', activity: 'Review code and plan daily tasks' },
      { time: '10:00 AM', activity: 'Attend team standup meeting' },
      { time: '11:00 AM', activity: 'Write and test new features' },
      { time: '1:00 PM', activity: 'Lunch break and team discussions' },
      { time: '2:00 PM', activity: 'Code review and debugging' },
      { time: '4:00 PM', activity: 'Client meeting and requirement analysis' },
      { time: '5:30 PM', activity: 'Documentation and knowledge sharing' }
    ],
    skills: [
      { name: 'Programming Languages', level: 90, required: true },
      { name: 'Problem Solving', level: 85, required: true },
      { name: 'Communication', level: 75, required: true },
      { name: 'Team Collaboration', level: 80, required: true },
      { name: 'Database Management', level: 70, required: false },
      { name: 'Project Management', level: 60, required: false }
    ],
    education: [
      'Bachelor\'s in Computer Science/IT',
      'Relevant certifications in programming',
      'Portfolio of projects',
      'Internship experience preferred'
    ],
    careerPath: [
      { level: 'Junior Developer', experience: '0-2 years', salary: '₹3-6 LPA' },
      { level: 'Software Engineer', experience: '2-4 years', salary: '₹6-12 LPA' },
      { level: 'Senior Developer', experience: '4-7 years', salary: '₹12-20 LPA' },
      { level: 'Tech Lead', experience: '7-10 years', salary: '₹20-35 LPA' },
      { level: 'Engineering Manager', experience: '10+ years', salary: '₹35-60 LPA' }
    ],
    companies: [
      { name: 'TCS', type: 'MNC', location: 'Multiple Cities' },
      { name: 'Infosys', type: 'MNC', location: 'Bangalore, Pune' },
      { name: 'Wipro', type: 'MNC', location: 'Multiple Cities' },
      { name: 'Flipkart', type: 'Product', location: 'Bangalore' },
      { name: 'Paytm', type: 'Fintech', location: 'Noida, Bangalore' }
    ],
    successStory: {
      name: 'Priya Sharma',
      age: 28,
      location: 'Jammu',
      story: `Started as a fresher at a local IT company in Jammu, worked hard to learn new technologies, and now works as a Senior Software Engineer at a leading tech company in Bangalore. The journey required dedication and continuous learning, but the career growth and opportunities have been incredible.`,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'skills', label: 'Skills', icon: 'Target' },
    { id: 'path', label: 'Career Path', icon: 'TrendingUp' },
    { id: 'day', label: 'Day in Life', icon: 'Clock' }
  ];

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-success bg-success/10';
      case 'High': return 'text-primary bg-primary/10';
      case 'Medium': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getGrowthColor = (growth) => {
    switch (growth) {
      case 'Very High': return 'text-success';
      case 'High': return 'text-primary';
      case 'Medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-bold text-foreground">{mockCareerData?.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                iconSize={16}
                onClick={() => onBookmark(career)}
                className={isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-semibold text-success">{mockCareerData?.salary}</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(mockCareerData?.demand)}`}>
                {mockCareerData?.demand} Demand
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={14} className={getGrowthColor(mockCareerData?.growth)} />
                <span className={`text-sm ${getGrowthColor(mockCareerData?.growth)}`}>
                  {mockCareerData?.growth} Growth
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={16}
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          />
        </div>
      </div>
      {/* Tabs */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-border/40">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        {activeTab === 'overview' && (
          <div className="p-4 space-y-6">
            {/* Career Image */}
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={mockCareerData?.image}
                alt={mockCareerData?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">About this Career</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mockCareerData?.description}
              </p>
            </div>

            {/* Education Requirements */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Education Requirements</h3>
              <div className="space-y-2">
                {mockCareerData?.education?.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="GraduationCap" size={16} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Companies */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Top Hiring Companies</h3>
              <div className="grid grid-cols-1 gap-2">
                {mockCareerData?.companies?.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <span className="font-medium text-foreground">{company?.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({company?.type})</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{company?.location}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Story */}
            <div className="glass-card rounded-lg p-4 border border-border/40">
              <h3 className="font-semibold text-foreground mb-3">Success Story</h3>
              <div className="flex items-start space-x-3">
                <Image
                  src={mockCareerData?.successStory?.image}
                  alt={mockCareerData?.successStory?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-foreground">{mockCareerData?.successStory?.name}</span>
                    <span className="text-sm text-muted-foreground">
                      • {mockCareerData?.successStory?.age} years • {mockCareerData?.successStory?.location}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mockCareerData?.successStory?.story}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="p-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Required Skills</h3>
              {mockCareerData?.skills?.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{skill?.name}</span>
                      {skill?.required && (
                        <span className="px-2 py-0.5 bg-error/10 text-error text-xs rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{skill?.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        skill?.required ? 'bg-primary' : 'bg-secondary'
                      }`}
                      style={{ width: `${skill?.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'path' && (
          <div className="p-4 space-y-6">
            <h3 className="font-semibold text-foreground">Career Progression Path</h3>
            <div className="space-y-4">
              {mockCareerData?.careerPath?.map((level, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 glass-card rounded-lg p-3 border border-border/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{level?.level}</h4>
                        <p className="text-sm text-muted-foreground">{level?.experience}</p>
                      </div>
                      <span className="font-semibold text-success">{level?.salary}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'day' && (
          <div className="p-4 space-y-6">
            <h3 className="font-semibold text-foreground">A Day in the Life</h3>
            <div className="space-y-3">
              {mockCareerData?.dayInLife?.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-16 text-sm font-medium text-primary">
                    {item?.time}
                  </div>
                  <div className="flex-1 glass-card rounded-lg p-3 border border-border/40">
                    <p className="text-sm text-foreground">{item?.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex-shrink-0 p-4 border-t border-border/40 bg-muted/20">
        <div className="flex space-x-2">
          <Button
            variant="default"
            iconName="ExternalLink"
            iconPosition="left"
            className="flex-1"
          >
            Explore Colleges
          </Button>
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            className="flex-1"
          >
            Share Career
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerDetailPanel;