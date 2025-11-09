import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import AIFloatingAssistant from '../../components/ui/AIFloatingAssistant';
import QuestionCard from './components/QuestionCard';
import ProgressBar from './components/ProgressBar';
import NavigationControls from './components/NavigationControls';
import SidebarTips from './components/SidebarTips';
import AssessmentComplete from './components/AssessmentComplete';

const AptitudeAssessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(new Date());
  const [completionTime, setCompletionTime] = useState('');

  // Mock assessment questions
  const questions = [
    {
      id: 1,
      category: "Logical Reasoning",
      icon: "Brain",
      title: "Problem-Solving Approach",
      description: "When faced with a complex problem, what is your preferred approach?",
      options: [
        {
          id: "a",
          icon: "Search",
          text: "Break it down systematically",
          description: "I like to analyze the problem step by step and create a logical sequence"
        },
        {
          id: "b",
          icon: "Lightbulb",
          text: "Think creatively first",
          description: "I prefer to brainstorm innovative solutions before following conventional methods"
        },
        {
          id: "c",
          icon: "Users",
          text: "Discuss with others",
          description: "I find it helpful to collaborate and get different perspectives"
        },
        {
          id: "d",
          icon: "BookOpen",
          text: "Research thoroughly",
          description: "I like to gather comprehensive information before making decisions"
        }
      ]
    },
    {
      id: 2,
      category: "Creative Thinking",
      icon: "Palette",
      title: "Learning Style Preference",
      description: "Which learning environment helps you understand concepts best?",
      options: [
        {
          id: "a",
          icon: "Eye",
          text: "Visual demonstrations",
          description: "I learn best through diagrams, charts, and visual representations"
        },
        {
          id: "b",
          icon: "Headphones",
          text: "Audio explanations",
          description: "I prefer listening to lectures and audio content"
        },
        {
          id: "c",
          icon: "Hand",
          text: "Hands-on practice",
          description: "I understand better when I can practice and experiment myself"
        },
        {
          id: "d",
          icon: "FileText",
          text: "Reading and writing",
          description: "I learn effectively through reading materials and taking notes"
        }
      ]
    },
    {
      id: 3,
      category: "Technical Aptitude",
      icon: "Settings",
      title: "Technology Interest",
      description: "Which technology-related activity interests you most?",
      options: [
        {
          id: "a",
          icon: "Code",
          text: "Programming and coding",
          description: "Creating software applications and solving coding challenges"
        },
        {
          id: "b",
          icon: "Smartphone",
          text: "Mobile app design",
          description: "Designing user interfaces and mobile experiences"
        },
        {
          id: "c",
          icon: "Database",
          text: "Data analysis",
          description: "Working with data to find patterns and insights"
        },
        {
          id: "d",
          icon: "Cpu",
          text: "Hardware systems",
          description: "Understanding how computer systems and hardware work"
        }
      ]
    },
    {
      id: 4,
      category: "Interpersonal Skills",
      icon: "Users",
      title: "Team Dynamics",
      description: "In group projects, what role do you naturally take?",
      options: [
        {
          id: "a",
          icon: "Crown",
          text: "Team leader",
          description: "I like to organize tasks and guide the team towards goals"
        },
        {
          id: "b",
          icon: "Lightbulb",
          text: "Idea generator",
          description: "I contribute creative solutions and innovative approaches"
        },
        {
          id: "c",
          icon: "CheckCircle",
          text: "Task executor",
          description: "I focus on completing assigned tasks efficiently and accurately"
        },
        {
          id: "d",
          icon: "MessageCircle",
          text: "Team coordinator",
          description: "I help facilitate communication and resolve conflicts"
        }
      ]
    },
    {
      id: 5,
      category: "Analytical Skills",
      icon: "BarChart3",
      title: "Decision Making",
      description: "When making important decisions, what do you rely on most?",
      options: [
        {
          id: "a",
          icon: "Calculator",
          text: "Data and statistics",
          description: "I prefer to base decisions on concrete numbers and factual evidence"
        },
        {
          id: "b",
          icon: "Heart",
          text: "Intuition and feelings",
          description: "I trust my gut feeling and emotional responses"
        },
        {
          id: "c",
          icon: "Users",
          text: "Others\' opinions",
          description: "I value input from trusted friends, family, and mentors"
        },
        {
          id: "d",
          icon: "Target",
          text: "Past experiences",
          description: "I draw from previous situations and lessons learned"
        }
      ]
    },
    {
      id: 6,
      category: "Logical Reasoning",
      icon: "Brain",
      title: "Subject Preference",
      description: "Which subject area do you find most engaging?",
      options: [
        {
          id: "a",
          icon: "Calculator",
          text: "Mathematics and Physics",
          description: "I enjoy working with numbers, formulas, and scientific concepts"
        },
        {
          id: "b",
          icon: "Globe",
          text: "Social Sciences",
          description: "I'm interested in human behavior, society, and cultural studies"
        },
        {
          id: "c",
          icon: "Palette",
          text: "Arts and Literature",
          description: "I'm drawn to creative expression, writing, and artistic pursuits"
        },
        {
          id: "d",
          icon: "Microscope",
          text: "Life Sciences",
          description: "I'm fascinated by biology, medicine, and living systems"
        }
      ]
    },
    {
      id: 7,
      category: "Creative Thinking",
      icon: "Palette",
      title: "Work Environment",
      description: "What type of work environment would you thrive in?",
      options: [
        {
          id: "a",
          icon: "Building",
          text: "Structured office",
          description: "I work best in organized, professional environments with clear routines"
        },
        {
          id: "b",
          icon: "Coffee",
          text: "Creative studio",
          description: "I prefer flexible, artistic spaces that encourage innovation"
        },
        {
          id: "c",
          icon: "Trees",
          text: "Outdoor fieldwork",
          description: "I enjoy working outside and being close to nature"
        },
        {
          id: "d",
          icon: "Home",
          text: "Remote/flexible",
          description: "I value the freedom to work from different locations"
        }
      ]
    },
    {
      id: 8,
      category: "Technical Aptitude",
      icon: "Settings",
      title: "Problem Complexity",
      description: "What type of challenges do you enjoy most?",
      options: [
        {
          id: "a",
          icon: "Puzzle",
          text: "Complex puzzles",
          description: "I like intricate problems that require deep thinking and analysis"
        },
        {
          id: "b",
          icon: "Zap",
          text: "Quick solutions",
          description: "I prefer fast-paced challenges that need immediate responses"
        },
        {
          id: "c",
          icon: "Users",
          text: "People-centered issues",
          description: "I\'m motivated by challenges that help others or improve relationships"
        },
        {
          id: "d",
          icon: "Wrench",
          text: "Practical problems",
          description: "I enjoy hands-on challenges with tangible, real-world applications"
        }
      ]
    },
    {
      id: 9,
      category: "Interpersonal Skills",
      icon: "Users",
      title: "Communication Style",
      description: "How do you prefer to communicate ideas?",
      options: [
        {
          id: "a",
          icon: "Presentation",
          text: "Visual presentations",
          description: "I like using slides, charts, and visual aids to explain concepts"
        },
        {
          id: "b",
          icon: "MessageCircle",
          text: "One-on-one discussions",
          description: "I'm most comfortable in personal, direct conversations"
        },
        {
          id: "c",
          icon: "FileText",
          text: "Written reports",
          description: "I express myself best through detailed written communication"
        },
        {
          id: "d",
          icon: "Users",
          text: "Group discussions",
          description: "I enjoy collaborative conversations with multiple people"
        }
      ]
    },
    {
      id: 10,
      category: "Analytical Skills",
      icon: "BarChart3",
      title: "Information Processing",
      description: "When learning something new, how do you process information?",
      options: [
        {
          id: "a",
          icon: "List",
          text: "Sequential steps",
          description: "I prefer to learn things in a logical, step-by-step order"
        },
        {
          id: "b",
          icon: "Shuffle",
          text: "Random exploration",
          description: "I like to explore different aspects and make connections naturally"
        },
        {
          id: "c",
          icon: "Target",
          text: "Big picture first",
          description: "I need to understand the overall concept before diving into details"
        },
        {
          id: "d",
          icon: "Layers",
          text: "Multiple perspectives",
          description: "I learn best by examining topics from various angles"
        }
      ]
    },
    {
      id: 11,
      category: "Logical Reasoning",
      icon: "Brain",
      title: "Career Motivation",
      description: "What motivates you most in choosing a career path?",
      options: [
        {
          id: "a",
          icon: "DollarSign",
          text: "Financial stability",
          description: "I want a career that provides good income and financial security"
        },
        {
          id: "b",
          icon: "Heart",
          text: "Personal passion",
          description: "I want to do something I'm genuinely passionate about"
        },
        {
          id: "c",
          icon: "Users",
          text: "Helping others",
          description: "I\'m motivated by making a positive impact on people\'s lives"
        },
        {
          id: "d",
          icon: "Award",
          text: "Recognition and status",
          description: "I value careers that offer prestige and professional recognition"
        }
      ]
    },
    {
      id: 12,
      category: "Creative Thinking",
      icon: "Palette",
      title: "Future Vision",
      description: "How do you envision your ideal career in 10 years?",
      options: [
        {
          id: "a",
          icon: "Briefcase",
          text: "Leading a team",
          description: "I see myself in a management role, guiding and mentoring others"
        },
        {
          id: "b",
          icon: "Lightbulb",
          text: "Innovating solutions",
          description: "I want to be creating new products, services, or ideas"
        },
        {
          id: "c",
          icon: "GraduationCap",
          text: "Becoming an expert",
          description: "I aim to be a recognized specialist in my chosen field"
        },
        {
          id: "d",
          icon: "Globe",
          text: "Making global impact",
          description: "I want my work to have widespread, meaningful influence"
        }
      ]
    }
  ];

  const totalQuestions = questions?.length;
  const completedQuestions = Object.keys(answers)?.map(Number);

  // Auto-save functionality
  useEffect(() => {
    const savedAnswers = localStorage.getItem('aptitude-assessment-answers');
    const savedQuestion = localStorage.getItem('aptitude-assessment-current');
    
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedQuestion) {
      setCurrentQuestion(parseInt(savedQuestion));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aptitude-assessment-answers', JSON.stringify(answers));
    localStorage.setItem('aptitude-assessment-current', currentQuestion?.toString());
  }, [answers, currentQuestion]);

  const handleAnswerSelect = (optionId) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate completion time
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000 / 60);
    setCompletionTime(`${duration} minutes`);
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear saved progress
    localStorage.removeItem('aptitude-assessment-answers');
    localStorage.removeItem('aptitude-assessment-current');
    
    setIsSubmitting(false);
    setIsCompleted(true);
  };

  const handleViewResults = () => {
    navigate('/career-exploration', { 
      state: { 
        fromAssessment: true, 
        assessmentResults: answers 
      } 
    });
  };

  const currentQuestionData = questions?.find(q => q?.id === currentQuestion);
  const selectedAnswer = answers?.[currentQuestion] || null;

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <AssessmentComplete
            answers={answers}
            onViewResults={handleViewResults}
            completionTime={completionTime}
          />
        </main>
        <AIFloatingAssistant />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Progress Section */}
          <div className="mb-8">
            <ProgressBar
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              completedQuestions={completedQuestions}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Question Section */}
            <div className="lg:col-span-3 space-y-6">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={currentQuestion}
                  question={currentQuestionData}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={handleAnswerSelect}
                  questionNumber={currentQuestion}
                  totalQuestions={totalQuestions}
                />
              </AnimatePresence>

              {/* Navigation Controls */}
              <NavigationControls
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
                selectedAnswer={selectedAnswer}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SidebarTips
                  currentQuestion={currentQuestion}
                  totalQuestions={totalQuestions}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIFloatingAssistant />
    </div>
  );
};

export default AptitudeAssessment;