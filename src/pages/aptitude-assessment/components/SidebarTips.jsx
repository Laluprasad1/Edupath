import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SidebarTips = ({ currentQuestion, totalQuestions }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const tips = [
    {
      icon: "Lightbulb",
      title: "Take Your Time",
      content: "There\'s no rush! Think carefully about each question and choose the answer that best represents you.",
      color: "accent"
    },
    {
      icon: "Heart",
      title: "Be Honest",
      content: "Answer based on what you truly enjoy and feel comfortable with, not what you think sounds impressive.",
      color: "error"
    },
    {
      icon: "Target",
      title: "Trust Your Instincts",
      content: "Your first instinct is often correct. Don\'t overthink your responses.",
      color: "primary"
    },
    {
      icon: "Star",
      title: "No Wrong Answers",
      content: "Every answer helps us understand you better. There are no right or wrong choices here.",
      color: "success"
    },
    {
      icon: "Compass",
      title: "Think About Your Future",
      content: "Consider what activities make you feel energized and what kind of work environment appeals to you.",
      color: "secondary"
    }
  ];

  const encouragements = [
    "You're doing great! Keep going.",
    "Excellent progress so far!",
    "You\'re halfway there!",
    "Almost finished! Stay focused.",
    "Final stretch! You\'ve got this!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [tips?.length]);

  const getProgressEncouragement = () => {
    const progress = (currentQuestion / totalQuestions) * 100;
    if (progress < 20) return encouragements?.[0];
    if (progress < 40) return encouragements?.[1];
    if (progress < 60) return encouragements?.[2];
    if (progress < 80) return encouragements?.[3];
    return encouragements?.[4];
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20',
      accent: 'bg-accent/10 text-accent border-accent/20',
      success: 'bg-success/10 text-success border-success/20',
      error: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="space-y-6">
      {/* Progress Encouragement */}
      <div className="glass-card rounded-xl border border-border/40 p-4 bg-gradient-to-br from-success/5 to-primary/5">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/10">
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <h3 className="font-semibold text-foreground">Progress Update</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {getProgressEncouragement()}
        </p>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 bg-gradient-to-r from-success to-primary rounded-full transition-all duration-500"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
      {/* Rotating Tips */}
      <div className="glass-card rounded-xl border border-border/40 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Info" size={16} className="text-primary" />
          <h3 className="font-semibold text-foreground">Helpful Tips</h3>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTipIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`rounded-lg border p-4 ${getColorClasses(tips?.[currentTipIndex]?.color)}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={tips?.[currentTipIndex]?.icon} 
                size={20} 
                className={tips?.[currentTipIndex]?.color === 'primary' ? 'text-primary' : 
                          tips?.[currentTipIndex]?.color === 'secondary' ? 'text-secondary' :
                          tips?.[currentTipIndex]?.color === 'accent' ? 'text-accent' :
                          tips?.[currentTipIndex]?.color === 'success' ? 'text-success' : 'text-error'}
              />
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {tips?.[currentTipIndex]?.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tips?.[currentTipIndex]?.content}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tip Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {tips?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTipIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTipIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Assessment Info */}
      <div className="glass-card rounded-xl border border-border/40 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Assessment Info</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="text-foreground font-medium">15-20 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Questions:</span>
            <span className="text-foreground font-medium">{totalQuestions} total</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Auto-save:</span>
            <span className="text-success font-medium flex items-center">
              <Icon name="Check" size={12} className="mr-1" />
              Enabled
            </span>
          </div>
        </div>
      </div>
      {/* Support */}
      <div className="glass-card rounded-xl border border-border/40 p-4 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MessageCircle" size={16} className="text-secondary" />
          <h3 className="font-semibold text-foreground">Need Help?</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Our AI assistant is here to help if you have any questions.
        </p>
        <button className="text-sm text-secondary hover:text-secondary/80 transition-colors font-medium">
          Chat with AI Assistant →
        </button>
      </div>
    </div>
  );
};

export default SidebarTips;