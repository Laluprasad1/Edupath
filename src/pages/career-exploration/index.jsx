import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AIFloatingAssistant from '../../components/ui/AIFloatingAssistant';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import CareerTreeVisualization from './components/CareerTreeVisualization';
import CareerFilters from './components/CareerFilters';
import CareerDetailPanel from './components/CareerDetailPanel';
import BookmarkedCareers from './components/BookmarkedCareers';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import ARCareerExplorer from './components/ARCareerExplorer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CareerExploration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [bookmarkedCareers, setBookmarkedCareers] = useState([]);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [activeView, setActiveView] = useState('tree'); // tree, recommendations, ar
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data - in real app, this would come from context/API
  const userProfile = {
    name: 'Arjun Sharma',
    class: '12th Science',
    location: 'Jammu',
    interests: ['Technology', 'Problem Solving', 'Innovation'],
    assessmentCompleted: true
  };

  const assessmentResults = {
    logicalReasoning: 92,
    analyticalThinking: 89,
    creativity: 78,
    communication: 85,
    mathematicalAptitude: 91,
    spatialReasoning: 87
  };

  // Personalized career recommendations based on assessment
  const personalizedCareers = [
    'Software Engineer',
    'Data Scientist',
    'Mechanical Engineer',
    'Research Scientist'
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Check if coming from assessment with results
    if (location?.state?.fromAssessment) {
      setActiveView('recommendations');
    }

    return () => clearTimeout(timer);
  }, [location?.state]);

  const handleStreamSelect = (streamId) => {
    setSelectedStream(streamId);
  };

  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
    setShowDetailPanel(true);
  };

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
    // In real app, this would trigger API call to filter careers
  };

  const handleBookmarkCareer = (career) => {
    const isBookmarked = bookmarkedCareers?.some(c => c?.name === career?.name);
    if (isBookmarked) {
      setBookmarkedCareers(prev => prev?.filter(c => c?.name !== career?.name));
    } else {
      setBookmarkedCareers(prev => [...prev, career]);
    }
  };

  const handleRemoveBookmark = (career) => {
    setBookmarkedCareers(prev => prev?.filter(c => c?.name !== career?.name));
  };

  const isCareerBookmarked = (career) => {
    return bookmarkedCareers?.some(c => c?.name === career?.name);
  };

  const handleViewAllRecommendations = () => {
    setActiveView('tree');
    setSelectedStream('science'); // Focus on science stream for tech careers
  };

  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedCareer(null);
  };

  const viewOptions = [
    { id: 'tree', label: 'Career Tree', icon: 'GitBranch', description: 'Interactive career mapping' },
    { id: 'recommendations', label: 'For You', icon: 'Target', description: 'Personalized suggestions' },
    { id: 'ar', label: 'AR Explorer', icon: 'Smartphone', description: 'Immersive experience' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Compass" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Loading Career Explorer</h3>
              <p className="text-sm text-muted-foreground">Preparing your personalized career journey...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Career Exploration
              </h1>
              <p className="text-muted-foreground">
                Discover your perfect career path through interactive exploration
              </p>
            </div>
            <Button
              variant="outline"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate('/student-dashboard')}
              className="hidden lg:flex"
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={2}
            totalSteps={4}
            variant="compact"
            className="mb-4"
          />

          {/* Welcome Message for Assessment Completers */}
          {location?.state?.fromAssessment && (
            <div className="glass-card rounded-xl p-4 border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Assessment Complete!</h3>
                  <p className="text-sm text-muted-foreground">
                    Great job! We've prepared personalized career recommendations based on your results.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {viewOptions?.map((option) => (
              <button
                key={option?.id}
                onClick={() => setActiveView(option?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeView === option?.id
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <div className="text-left">
                  <div>{option?.label}</div>
                  <div className="text-xs opacity-80">{option?.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters & Bookmarks */}
          <div className="lg:col-span-1 space-y-6">
            {activeView === 'tree' && (
              <CareerFilters
                onFiltersChange={handleFiltersChange}
                activeFilters={activeFilters}
              />
            )}
            
            <BookmarkedCareers
              bookmarkedCareers={bookmarkedCareers}
              onRemoveBookmark={handleRemoveBookmark}
              onCareerSelect={handleCareerSelect}
            />
          </div>

          {/* Main Content Area */}
          <div className={`${showDetailPanel ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
            {activeView === 'recommendations' && (
              <PersonalizedRecommendations
                userProfile={userProfile}
                assessmentResults={assessmentResults}
                onCareerSelect={handleCareerSelect}
                onViewAllRecommendations={handleViewAllRecommendations}
              />
            )}

            {activeView === 'tree' && (
              <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
                <div className="h-[600px]">
                  <CareerTreeVisualization
                    selectedStream={selectedStream}
                    onStreamSelect={handleStreamSelect}
                    onCareerSelect={handleCareerSelect}
                    personalizedCareers={personalizedCareers}
                  />
                </div>
              </div>
            )}

            {activeView === 'ar' && (
              <ARCareerExplorer
                onCareerSelect={handleCareerSelect}
              />
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card rounded-lg p-4 border border-border/40 text-center">
                <div className="text-2xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Career Options</div>
              </div>
              <div className="glass-card rounded-lg p-4 border border-border/40 text-center">
                <div className="text-2xl font-bold text-secondary mb-1">25+</div>
                <div className="text-sm text-muted-foreground">Industry Sectors</div>
              </div>
              <div className="glass-card rounded-lg p-4 border border-border/40 text-center">
                <div className="text-2xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-muted-foreground">College Programs</div>
              </div>
              <div className="glass-card rounded-lg p-4 border border-border/40 text-center">
                <div className="text-2xl font-bold text-success mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Match Accuracy</div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Career Details */}
          {showDetailPanel && (
            <div className="lg:col-span-1">
              <div className="glass-card rounded-xl border border-border/40 overflow-hidden h-[600px]">
                <CareerDetailPanel
                  career={selectedCareer}
                  onClose={handleCloseDetailPanel}
                  onBookmark={handleBookmarkCareer}
                  isBookmarked={isCareerBookmarked(selectedCareer)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            iconName="GraduationCap"
            iconPosition="left"
            onClick={() => navigate('/college-details')}
            className="flex-1 sm:flex-none"
          >
            Explore Colleges
          </Button>
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            onClick={() => navigate('/timeline-tracker')}
            className="flex-1 sm:flex-none"
          >
            Plan Timeline
          </Button>
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => navigate('/ai-chat-assistant')}
            className="flex-1 sm:flex-none"
          >
            Ask AI Advisor
          </Button>
        </div>
      </div>
      <AIFloatingAssistant />
    </div>
  );
};

export default CareerExploration;