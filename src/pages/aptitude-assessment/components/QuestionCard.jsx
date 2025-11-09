import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  questionNumber, 
  totalQuestions 
}) => {
  const handleOptionClick = (optionId) => {
    onAnswerSelect(optionId);
  };

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Question Header */}
      <div className="glass-card rounded-2xl border border-border/40 p-6 mb-6 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 shrink-0">
            <Icon name={question?.icon} size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary">
                Question {questionNumber} of {totalQuestions}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">
                {question?.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {question?.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {question?.description}
            </p>
          </div>
        </div>
      </div>
      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question?.options?.map((option) => (
          <motion.div
            key={option?.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`glass-card rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 ${
              selectedAnswer === option?.id
                ? 'border-primary bg-primary/10 shadow-elevation-2'
                : 'border-border/40 hover:border-primary/50 hover:bg-primary/5'
            }`}
            onClick={() => handleOptionClick(option?.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-colors ${
                selectedAnswer === option?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={option?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold mb-2 transition-colors ${
                  selectedAnswer === option?.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {option?.text}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {option?.description}
                </p>
              </div>
              {selectedAnswer === option?.id && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary shrink-0">
                  <Icon name="Check" size={14} color="white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;