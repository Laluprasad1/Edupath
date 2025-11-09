import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentComplete = ({ 
  answers, 
  onViewResults, 
  completionTime 
}) => {
  const navigate = useNavigate();

  const calculateScores = () => {
    const categories = {
      logical: 0,
      creative: 0,
      technical: 0,
      interpersonal: 0,
      analytical: 0
    };

    // Mock scoring based on answers
    Object.values(answers)?.forEach((answer, index) => {
      const category = ['logical', 'creative', 'technical', 'interpersonal', 'analytical']?.[index % 5];
      categories[category] += Math.floor(Math.random() * 20) + 60; // Mock scores 60-80
    });

    return categories;
  };

  const scores = calculateScores();
  const topStrength = Object.entries(scores)?.reduce((a, b) => scores?.[a?.[1]] > scores?.[b?.[1]] ? a : b)?.[0];

  const strengthInfo = {
    logical: {
      title: "Logical Reasoning",
      description: "You excel at problem-solving and analytical thinking",
      icon: "Brain",
      color: "primary",
      careers: ["Engineering", "Computer Science", "Mathematics", "Research"]
    },
    creative: {
      title: "Creative Thinking",
      description: "You have strong artistic and innovative abilities",
      icon: "Palette",
      color: "secondary",
      careers: ["Design", "Arts", "Media", "Architecture"]
    },
    technical: {
      title: "Technical Aptitude",
      description: "You show great potential in technical fields",
      icon: "Settings",
      color: "accent",
      careers: ["Technology", "Engineering", "IT", "Robotics"]
    },
    interpersonal: {
      title: "Interpersonal Skills",
      description: "You work well with others and communicate effectively",
      icon: "Users",
      color: "success",
      careers: ["Management", "Teaching", "Psychology", "Social Work"]
    },
    analytical: {
      title: "Analytical Skills",
      description: "You\'re excellent at data analysis and research",
      icon: "BarChart3",
      color: "warning",
      careers: ["Data Science", "Finance", "Research", "Statistics"]
    }
  };

  const currentStrength = strengthInfo?.[topStrength];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Completion Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-success to-primary mx-auto"
        >
          <Icon name="CheckCircle" size={40} color="white" />
        </motion.div>
        
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Assessment Complete!
          </h1>
          <p className="text-lg text-muted-foreground">
            Great job! You've successfully completed the aptitude assessment.
          </p>
        </div>
      </div>
      {/* Completion Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl border border-border/40 p-4 text-center">
          <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Time Taken</p>
          <p className="text-lg font-semibold text-foreground">{completionTime}</p>
        </div>
        
        <div className="glass-card rounded-xl border border-border/40 p-4 text-center">
          <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Questions Answered</p>
          <p className="text-lg font-semibold text-foreground">{Object.keys(answers)?.length}/12</p>
        </div>
        
        <div className="glass-card rounded-xl border border-border/40 p-4 text-center">
          <Icon name="Target" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <p className="text-lg font-semibold text-foreground">100%</p>
        </div>
      </div>
      {/* Top Strength Preview */}
      <div className="glass-card rounded-2xl border border-border/40 p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-start space-x-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
            currentStrength?.color === 'primary' ? 'bg-primary/10' :
            currentStrength?.color === 'secondary' ? 'bg-secondary/10' :
            currentStrength?.color === 'accent' ? 'bg-accent/10' :
            currentStrength?.color === 'success' ? 'bg-success/10' : 'bg-warning/10'
          }`}>
            <Icon 
              name={currentStrength?.icon} 
              size={24} 
              className={
                currentStrength?.color === 'primary' ? 'text-primary' :
                currentStrength?.color === 'secondary' ? 'text-secondary' :
                currentStrength?.color === 'accent' ? 'text-accent' :
                currentStrength?.color === 'success' ? 'text-success' : 'text-warning'
              }
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Your Top Strength: {currentStrength?.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {currentStrength?.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {currentStrength?.careers?.map((career, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          size="lg"
          iconName="BarChart3"
          iconPosition="left"
          onClick={onViewResults}
          className="bg-primary hover:bg-primary/90"
        >
          View Detailed Results
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          iconName="Compass"
          iconPosition="left"
          onClick={() => navigate('/career-exploration')}
        >
          Explore Career Paths
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          iconName="Home"
          iconPosition="left"
          onClick={() => navigate('/student-dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>
      {/* Next Steps */}
      <div className="glass-card rounded-xl border border-border/40 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Compass" size={20} className="text-primary mr-2" />
          What's Next?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 shrink-0">
              <Icon name="Search" size={16} className="text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Explore Career Options</h4>
              <p className="text-sm text-muted-foreground">
                Discover careers that match your strengths and interests
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 shrink-0">
              <Icon name="GraduationCap" size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Research Colleges</h4>
              <p className="text-sm text-muted-foreground">
                Find colleges that offer programs aligned with your goals
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success/10 shrink-0">
              <Icon name="Calendar" size={16} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Plan Your Timeline</h4>
              <p className="text-sm text-muted-foreground">
                Create a roadmap with important deadlines and milestones
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning/10 shrink-0">
              <Icon name="MessageCircle" size={16} className="text-warning" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Get AI Guidance</h4>
              <p className="text-sm text-muted-foreground">
                Chat with our AI advisor for personalized recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentComplete;