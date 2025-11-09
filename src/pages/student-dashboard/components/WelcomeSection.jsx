import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ studentName = "Arjun", classLevel = "12", stream = "Science" }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Your future starts with the choices you make today!",
      "Every step forward is progress toward your dreams.",
      "Discover your potential and unlock new opportunities.",
      "Your journey to success begins with self-discovery."
    ];
    return messages?.[Math.floor(Math.random() * messages?.length)];
  };

  return (
    <div className="glass-card rounded-2xl border border-border/40 p-6 lg:p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Welcome Content */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary">
              <Icon name="User" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {getCurrentGreeting()}, {studentName}!
              </h1>
              <p className="text-sm text-muted-foreground">
                Class {classLevel} • {stream} Stream
              </p>
            </div>
          </div>
          
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            {getMotivationalMessage()}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm">
              <Icon name="Calendar" size={14} />
              <span>Academic Year 2024-25</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              <Icon name="MapPin" size={14} />
              <span>Jammu & Kashmir</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-3">
          <div className="text-center lg:text-right">
            <p className="text-2xl font-bold text-primary">75%</p>
            <p className="text-xs text-muted-foreground">Profile Complete</p>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-2xl font-bold text-secondary">12</p>
            <p className="text-xs text-muted-foreground">Colleges Saved</p>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-2xl font-bold text-accent">3</p>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;