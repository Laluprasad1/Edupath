import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ 
  userProfile = {}, 
  assessmentResults = {}, 
  onCareerSelect,
  onViewAllRecommendations 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock personalized recommendations based on user profile
  const recommendations = [
    {
      id: 1,
      name: 'Software Engineer',
      matchPercentage: 95,
      salary: '₹6-25 LPA',
      demand: 'Very High',
      growth: 'High',
      reason: 'Perfect match for your analytical thinking and problem-solving skills',
      skills: ['Programming', 'Logic', 'Problem Solving'],
      stream: 'Technology',
      category: 'Engineering',
      whyRecommended: [
        'Your aptitude test shows strong logical reasoning (92%)',
        'High interest in technology and innovation',
        'Excellent problem-solving capabilities',
        'Growing demand in Jammu & Kashmir region'
      ],
      nextSteps: [
        'Learn programming languages (Python, Java)',
        'Build projects and create a portfolio',
        'Apply for B.Tech Computer Science',
        'Consider internships at local IT companies'
      ]
    },
    {
      id: 2,
      name: 'Data Scientist',
      matchPercentage: 88,
      salary: '₹8-30 LPA',
      demand: 'Very High',
      growth: 'Very High',
      reason: 'Your mathematical aptitude and analytical skills are exceptional',
      skills: ['Mathematics', 'Statistics', 'Programming'],
      stream: 'Science',
      category: 'Analytics',
      whyRecommended: [
        'Outstanding mathematical reasoning (89%)',
        'Strong analytical thinking patterns',
        'Interest in data and patterns',
        'High growth potential in emerging field'
      ],
      nextSteps: [
        'Strengthen mathematics and statistics',
        'Learn Python and R programming',
        'Pursue B.Sc in Mathematics/Statistics',
        'Take online courses in data analysis'
      ]
    },
    {
      id: 3,
      name: 'Digital Marketing Manager',
      matchPercentage: 82,
      salary: '₹4-18 LPA',
      demand: 'High',
      growth: 'High',
      reason: 'Your creativity and communication skills align perfectly',
      skills: ['Communication', 'Creativity', 'Analytics'],
      stream: 'Commerce',
      category: 'Marketing',
      whyRecommended: [
        'Excellent communication skills (85%)',
        'Creative thinking and innovation',
        'Understanding of digital trends',
        'Growing opportunities in digital economy'
      ],
      nextSteps: [
        'Learn digital marketing fundamentals',
        'Pursue BBA or B.Com with marketing focus',
        'Get certified in Google Ads and Analytics',
        'Start a personal blog or social media presence'
      ]
    },
    {
      id: 4,
      name: 'UI/UX Designer',
      matchPercentage: 79,
      salary: '₹5-22 LPA',
      demand: 'Very High',
      growth: 'Very High',
      reason: 'Your visual thinking and user empathy are remarkable',
      skills: ['Design', 'Creativity', 'User Research'],
      stream: 'Arts',
      category: 'Design',
      whyRecommended: [
        'Strong visual and spatial reasoning (87%)',
        'Empathy and user-centered thinking',
        'Interest in aesthetics and functionality',
        'Rapidly growing field with remote opportunities'
      ],
      nextSteps: [
        'Learn design tools (Figma, Adobe Creative Suite)',
        'Build a design portfolio',
        'Pursue B.Des or related design degree',
        'Take online UX/UI courses and certifications'
      ]
    }
  ];

  const currentRecommendation = recommendations?.[currentIndex];

  const nextRecommendation = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations?.length);
  };

  const prevRecommendation = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations?.length) % recommendations?.length);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 80) return 'text-primary bg-primary/10';
    if (percentage >= 70) return 'text-warning bg-warning/10';
    return 'text-muted-foreground bg-muted';
  };

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
      <div className="p-4 border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Icon name="Target" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Personalized for You</h3>
              <p className="text-sm text-muted-foreground">
                Based on your assessment results
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {recommendations?.length}
            </span>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronLeft"
                iconSize={16}
                onClick={prevRecommendation}
                disabled={recommendations?.length <= 1}
                className="w-8 h-8"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
                iconSize={16}
                onClick={nextRecommendation}
                disabled={recommendations?.length <= 1}
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Recommendation Card */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Career Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h4 className="text-lg font-semibold text-foreground">
                  {currentRecommendation?.name}
                </h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(currentRecommendation?.matchPercentage)}`}>
                  {currentRecommendation?.matchPercentage}% Match
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-lg font-semibold text-success">
                  {currentRecommendation?.salary}
                </span>
                <span className={`text-sm ${getDemandColor(currentRecommendation?.demand)}`}>
                  {currentRecommendation?.demand} Demand
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentRecommendation?.reason}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Key Skills</h5>
            <div className="flex flex-wrap gap-2">
              {currentRecommendation?.skills?.map((skill, index) => (
                <div key={index} className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Why Recommended */}
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Why This Career?</h5>
            <div className="space-y-1">
              {currentRecommendation?.whyRecommended?.map((reason, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-2">
            <h5 className="font-medium text-foreground">Next Steps</h5>
            <div className="space-y-1">
              {currentRecommendation?.nextSteps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              variant="default"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onCareerSelect(currentRecommendation)}
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              iconName="Bookmark"
              iconPosition="left"
              className="flex-1"
            >
              Save Career
            </Button>
          </div>
        </div>
      </div>
      {/* Progress Indicators */}
      <div className="px-6 pb-4">
        <div className="flex space-x-2">
          {recommendations?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary flex-1' :'bg-muted w-2 hover:bg-muted-foreground/20'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border/40 bg-muted/20">
        <Button
          variant="outline"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={onViewAllRecommendations}
          className="w-full"
        >
          View All {recommendations?.length} Recommendations
        </Button>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;