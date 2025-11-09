import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionLauncher from '../../components/ui/QuickActionLauncher';
import AIFloatingAssistant from '../../components/ui/AIFloatingAssistant';
import WelcomeSection from './components/WelcomeSection';
import ProgressOverview from './components/ProgressOverview';
import AchievementBadges from './components/AchievementBadges';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import RecentActivity from './components/RecentActivity';

const StudentDashboard = () => {
  // Mock user data
  const userProgress = {
    assessmentCompleted: false,
    assessmentProgress: 85,
    explorationCompleted: false,
    explorationProgress: 60,
    collegeResearchCompleted: false,
    collegeResearchProgress: 30,
    timelineCompleted: false,
    timelineProgress: 15
  };

  const studentData = {
    name: "Arjun Kumar",
    classLevel: "12",
    stream: "Science",
    location: "Srinagar, J&K"
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Student Dashboard - EduPath Advisor</title>
        <meta name="description" content="Your personalized career guidance dashboard. Track progress, explore careers, and plan your educational journey." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-6 lg:py-8 space-y-8">
        {/* Welcome Section */}
        <WelcomeSection 
          studentName={studentData?.name}
          classLevel={studentData?.classLevel}
          stream={studentData?.stream}
        />

        {/* Quick Actions */}
        <section>
          <QuickActionLauncher 
            userProgress={userProgress}
            variant="grid"
          />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress & Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <section>
              <ProgressOverview 
                currentStep={2}
                assessmentProgress={userProgress?.assessmentProgress}
                explorationProgress={userProgress?.explorationProgress}
                collegeResearchProgress={userProgress?.collegeResearchProgress}
                timelineProgress={userProgress?.timelineProgress}
              />
            </section>

            {/* Achievement Badges */}
            <section>
              <AchievementBadges 
                unlockedBadges={['assessment-complete', 'first-exploration', 'college-saver']}
                totalBadges={12}
              />
            </section>
          </div>

          {/* Right Column - Deadlines & Activity */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <section>
              <UpcomingDeadlines />
            </section>

            {/* Recent Activity */}
            <section>
              <RecentActivity />
            </section>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <section className="glass-card rounded-2xl border border-border/40 p-6 lg:p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to Take the Next Step?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Your personalized career journey awaits. Complete your assessment to unlock 
              tailored recommendations and discover the perfect educational path for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <QuickActionLauncher 
                userProgress={userProgress}
                variant="compact"
                className="justify-center"
              />
            </div>
          </div>
        </section>
      </main>
      {/* AI Floating Assistant */}
      <AIFloatingAssistant />
    </div>
  );
};

export default StudentDashboard;