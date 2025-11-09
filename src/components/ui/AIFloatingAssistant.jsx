import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AIFloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi! I\'m your AI career advisor. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getContextualSuggestions = () => {
    const path = location?.pathname;
    switch (path) {
      case '/student-dashboard':
        return [
          'What should I focus on today?',
          'Show my progress summary',
          'What are my next steps?'
        ];
      case '/aptitude-assessment':
        return [
          'How do I prepare for the assessment?',
          'What does this test measure?',
          'How long will this take?'
        ];
      case '/career-exploration':
        return [
          'What careers match my interests?',
          'Tell me about engineering fields',
          'What are trending career options?'
        ];
      case '/college-details':
        return [
          'Compare these colleges for me',
          'What are the admission requirements?',
          'Help me shortlist colleges'
        ];
      case '/timeline-tracker':
        return [
          'What deadlines are coming up?',
          'Help me plan my schedule',
          'What should I prioritize?'
        ];
      default:
        return [
          'Help me get started',
          'What can you do?',
          'Show me my options'
        ];
    }
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That\'s a great question! Based on your profile, I\'d recommend focusing on your strengths in analytical thinking.',
        'I can help you with that. Let me analyze your current progress and suggest the best next steps.',
        'Excellent choice! This aligns well with your interests and aptitude scores. Here\'s what you should know...',
        'I understand your concern. Many students feel this way. Let me break this down into manageable steps.',
        'Based on your assessment results, here are some personalized recommendations for you.'
      ];

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses?.[Math.floor(Math.random() * responses?.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-300 w-80 max-w-[calc(100vw-2rem)] lg:w-96">
          <div className="glass-card rounded-2xl border border-border/40 shadow-floating overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/40 bg-gradient-to-r from-primary/5 to-secondary/5">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">AI Career Advisor</h3>
                  <p className="text-xs text-success flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse"></div>
                    Online
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconSize={16}
                onClick={toggleChat}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      message?.type === 'user' ?'bg-primary text-primary-foreground ml-4' :'bg-muted text-muted-foreground mr-4'
                    }`}
                  >
                    <p>{message?.content}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      message?.type === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {formatTime(message?.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-2 mr-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 border-t border-border/40 bg-muted/20">
              <div className="flex flex-wrap gap-2">
                {getContextualSuggestions()?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors focus-ring"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/40">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Ask me anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Send"
                  iconSize={16}
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage?.trim() || isTyping}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Floating Button */}
      <div className="fixed bottom-4 right-4 z-200">
        <Button
          variant="default"
          size="lg"
          iconName={isOpen ? "MessageCircle" : "MessageCircle"}
          iconSize={24}
          onClick={toggleChat}
          className={`rounded-full shadow-floating transition-all duration-300 hover:scale-105 ${
            isOpen ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
          )}
        </Button>
      </div>
    </>
  );
};

export default AIFloatingAssistant;