import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CareerTreeVisualization = ({ selectedStream, onStreamSelect, onCareerSelect, personalizedCareers = [] }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [hoveredNode, setHoveredNode] = useState(null);

  const careerStreams = [
    {
      id: 'science',
      name: 'Science Stream',
      icon: 'Atom',
      color: 'primary',
      branches: [
        {
          id: 'engineering',
          name: 'Engineering',
          icon: 'Cog',
          degrees: ['B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Tech Electrical'],
          careers: [
            { name: 'Software Engineer', salary: '₹6-25 LPA', growth: 'High', demand: 'Very High' },
            { name: 'Mechanical Engineer', salary: '₹4-18 LPA', growth: 'Medium', demand: 'High' },
            { name: 'Civil Engineer', salary: '₹3-15 LPA', growth: 'Medium', demand: 'Medium' }
          ]
        },
        {
          id: 'medical',
          name: 'Medical',
          icon: 'Heart',
          degrees: ['MBBS', 'BDS', 'BAMS', 'BHMS'],
          careers: [
            { name: 'Doctor', salary: '₹8-50 LPA', growth: 'High', demand: 'Very High' },
            { name: 'Dentist', salary: '₹5-30 LPA', growth: 'High', demand: 'High' },
            { name: 'Physiotherapist', salary: '₹3-12 LPA', growth: 'Medium', demand: 'Medium' }
          ]
        },
        {
          id: 'research',
          name: 'Research & Development',
          icon: 'Microscope',
          degrees: ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Biology', 'B.Sc Mathematics'],
          careers: [
            { name: 'Research Scientist', salary: '₹5-20 LPA', growth: 'Medium', demand: 'Medium' },
            { name: 'Lab Technician', salary: '₹2-8 LPA', growth: 'Low', demand: 'Medium' },
            { name: 'Data Scientist', salary: '₹8-30 LPA', growth: 'Very High', demand: 'Very High' }
          ]
        }
      ]
    },
    {
      id: 'commerce',
      name: 'Commerce Stream',
      icon: 'TrendingUp',
      color: 'secondary',
      branches: [
        {
          id: 'business',
          name: 'Business & Management',
          icon: 'Briefcase',
          degrees: ['BBA', 'B.Com', 'BMS', 'BBM'],
          careers: [
            { name: 'Business Analyst', salary: '₹4-18 LPA', growth: 'High', demand: 'High' },
            { name: 'Marketing Manager', salary: '₹5-25 LPA', growth: 'High', demand: 'High' },
            { name: 'HR Manager', salary: '₹4-20 LPA', growth: 'Medium', demand: 'High' }
          ]
        },
        {
          id: 'finance',
          name: 'Finance & Banking',
          icon: 'DollarSign',
          degrees: ['B.Com Finance', 'BBA Finance', 'CA', 'CS'],
          careers: [
            { name: 'Chartered Accountant', salary: '₹6-40 LPA', growth: 'High', demand: 'Very High' },
            { name: 'Investment Banker', salary: '₹8-50 LPA', growth: 'High', demand: 'High' },
            { name: 'Financial Advisor', salary: '₹3-15 LPA', growth: 'Medium', demand: 'High' }
          ]
        },
        {
          id: 'economics',
          name: 'Economics',
          icon: 'BarChart3',
          degrees: ['B.A Economics', 'B.Sc Economics', 'BBA Economics'],
          careers: [
            { name: 'Economist', salary: '₹5-25 LPA', growth: 'Medium', demand: 'Medium' },
            { name: 'Policy Analyst', salary: '₹4-18 LPA', growth: 'Medium', demand: 'Medium' },
            { name: 'Market Researcher', salary: '₹3-12 LPA', growth: 'High', demand: 'High' }
          ]
        }
      ]
    },
    {
      id: 'arts',
      name: 'Arts & Humanities',
      icon: 'Palette',
      color: 'accent',
      branches: [
        {
          id: 'literature',
          name: 'Literature & Languages',
          icon: 'BookOpen',
          degrees: ['B.A English', 'B.A Hindi', 'B.A Urdu', 'B.A Foreign Languages'],
          careers: [
            { name: 'Content Writer', salary: '₹3-15 LPA', growth: 'High', demand: 'Very High' },
            { name: 'Translator', salary: '₹2-12 LPA', growth: 'Medium', demand: 'High' },
            { name: 'Journalist', salary: '₹3-18 LPA', growth: 'Medium', demand: 'Medium' }
          ]
        },
        {
          id: 'social-science',
          name: 'Social Sciences',
          icon: 'Users',
          degrees: ['B.A Psychology', 'B.A Sociology', 'B.A Political Science', 'B.A History'],
          careers: [
            { name: 'Psychologist', salary: '₹4-20 LPA', growth: 'High', demand: 'High' },
            { name: 'Social Worker', salary: '₹2-10 LPA', growth: 'Medium', demand: 'High' },
            { name: 'Civil Services Officer', salary: '₹7-30 LPA', growth: 'High', demand: 'Medium' }
          ]
        },
        {
          id: 'creative',
          name: 'Creative Arts',
          icon: 'Camera',
          degrees: ['B.F.A', 'B.Des', 'B.A Fine Arts', 'Diploma in Design'],
          careers: [
            { name: 'Graphic Designer', salary: '₹3-18 LPA', growth: 'High', demand: 'Very High' },
            { name: 'UI/UX Designer', salary: '₹5-25 LPA', growth: 'Very High', demand: 'Very High' },
            { name: 'Photographer', salary: '₹2-15 LPA', growth: 'Medium', demand: 'High' }
          ]
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical & Vocational',
      icon: 'Wrench',
      color: 'success',
      branches: [
        {
          id: 'it',
          name: 'Information Technology',
          icon: 'Monitor',
          degrees: ['BCA', 'B.Sc IT', 'Diploma in IT', 'B.Tech IT'],
          careers: [
            { name: 'Web Developer', salary: '₹4-20 LPA', growth: 'Very High', demand: 'Very High' },
            { name: 'Cybersecurity Analyst', salary: '₹6-25 LPA', growth: 'Very High', demand: 'Very High' },
            { name: 'Database Administrator', salary: '₹5-18 LPA', growth: 'High', demand: 'High' }
          ]
        },
        {
          id: 'skilled-trades',
          name: 'Skilled Trades',
          icon: 'Hammer',
          degrees: ['ITI Courses', 'Polytechnic Diploma', 'Skill Development Courses'],
          careers: [
            { name: 'Electrician', salary: '₹2-12 LPA', growth: 'Medium', demand: 'High' },
            { name: 'Plumber', salary: '₹2-10 LPA', growth: 'Medium', demand: 'High' },
            { name: 'Automotive Technician', salary: '₹3-15 LPA', growth: 'High', demand: 'High' }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded?.has(nodeId)) {
      newExpanded?.delete(nodeId);
    } else {
      newExpanded?.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 border-primary/20 text-primary',
      secondary: 'bg-secondary/10 border-secondary/20 text-secondary',
      accent: 'bg-accent/10 border-accent/20 text-accent',
      success: 'bg-success/10 border-success/20 text-success'
    };
    return colors?.[color] || colors?.primary;
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-success';
      case 'High': return 'text-primary';
      case 'Medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const isPersonalized = (careerId) => {
    return personalizedCareers?.includes(careerId);
  };

  return (
    <div className="w-full h-full bg-background">
      {/* Desktop Tree View */}
      <div className="hidden lg:block h-full overflow-auto custom-scrollbar">
        <div className="min-h-full p-6">
          <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
            {careerStreams?.map((stream, streamIndex) => (
              <div key={stream?.id} className="space-y-4">
                {/* Stream Header */}
                <div
                  className={`glass-card rounded-xl p-4 border cursor-pointer transition-all duration-300 hover:shadow-elevation-2 ${
                    getColorClasses(stream?.color)
                  } ${selectedStream === stream?.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => onStreamSelect(stream?.id)}
                  onMouseEnter={() => setHoveredNode(stream?.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getColorClasses(stream?.color)}`}>
                      <Icon name={stream?.icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{stream?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {stream?.branches?.length} specializations
                      </p>
                    </div>
                    <Icon 
                      name={expandedNodes?.has(stream?.id) ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Branches */}
                {(expandedNodes?.has(stream?.id) || selectedStream === stream?.id) && (
                  <div className="space-y-3 ml-4">
                    {stream?.branches?.map((branch) => (
                      <div key={branch?.id} className="space-y-2">
                        <div
                          className="glass-card rounded-lg p-3 border border-border/40 cursor-pointer transition-all duration-200 hover:bg-accent/5"
                          onClick={() => toggleNode(branch?.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name={branch?.icon} size={18} className="text-muted-foreground" />
                            <span className="font-medium text-foreground">{branch?.name}</span>
                            <Icon 
                              name={expandedNodes?.has(branch?.id) ? "Minus" : "Plus"} 
                              size={16} 
                              className="text-muted-foreground ml-auto"
                            />
                          </div>
                        </div>

                        {/* Careers */}
                        {expandedNodes?.has(branch?.id) && (
                          <div className="space-y-2 ml-6">
                            {branch?.careers?.map((career, careerIndex) => (
                              <div
                                key={careerIndex}
                                className={`glass-card rounded-lg p-3 border cursor-pointer transition-all duration-200 hover:shadow-elevation-1 ${
                                  isPersonalized(career?.name) 
                                    ? 'border-primary/40 bg-primary/5' :'border-border/40 hover:bg-accent/5'
                                }`}
                                onClick={() => onCareerSelect(career)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <h4 className="font-medium text-foreground">{career?.name}</h4>
                                      {isPersonalized(career?.name) && (
                                        <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                          Recommended
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-4 mt-1">
                                      <span className="text-sm font-medium text-success">
                                        {career?.salary}
                                      </span>
                                      <span className={`text-sm ${getDemandColor(career?.demand)}`}>
                                        {career?.demand} Demand
                                      </span>
                                    </div>
                                  </div>
                                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mobile Accordion View */}
      <div className="lg:hidden h-full overflow-auto custom-scrollbar">
        <div className="p-4 space-y-4">
          {careerStreams?.map((stream) => (
            <div key={stream?.id} className="space-y-3">
              {/* Stream Header */}
              <div
                className={`glass-card rounded-xl p-4 border cursor-pointer transition-all duration-300 ${
                  getColorClasses(stream?.color)
                } ${selectedStream === stream?.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => {
                  onStreamSelect(stream?.id);
                  toggleNode(stream?.id);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(stream?.color)}`}>
                    <Icon name={stream?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{stream?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {stream?.branches?.length} specializations
                    </p>
                  </div>
                  <Icon 
                    name={expandedNodes?.has(stream?.id) ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-muted-foreground"
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {expandedNodes?.has(stream?.id) && (
                <div className="space-y-3">
                  {stream?.branches?.map((branch) => (
                    <div key={branch?.id} className="ml-4">
                      <div
                        className="glass-card rounded-lg p-3 border border-border/40 cursor-pointer transition-all duration-200 hover:bg-accent/5"
                        onClick={() => toggleNode(branch?.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon name={branch?.icon} size={16} className="text-muted-foreground" />
                          <span className="font-medium text-foreground text-sm">{branch?.name}</span>
                          <Icon 
                            name={expandedNodes?.has(branch?.id) ? "Minus" : "Plus"} 
                            size={14} 
                            className="text-muted-foreground ml-auto"
                          />
                        </div>
                      </div>

                      {expandedNodes?.has(branch?.id) && (
                        <div className="mt-2 space-y-2 ml-4">
                          {branch?.careers?.map((career, careerIndex) => (
                            <div
                              key={careerIndex}
                              className={`glass-card rounded-lg p-3 border cursor-pointer transition-all duration-200 ${
                                isPersonalized(career?.name) 
                                  ? 'border-primary/40 bg-primary/5' :'border-border/40 hover:bg-accent/5'
                              }`}
                              onClick={() => onCareerSelect(career)}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium text-foreground text-sm">{career?.name}</h4>
                                  {isPersonalized(career?.name) && (
                                    <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                                      Recommended
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-success">
                                    {career?.salary}
                                  </span>
                                  <span className={`text-xs ${getDemandColor(career?.demand)}`}>
                                    {career?.demand} Demand
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTreeVisualization;