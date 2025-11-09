import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChatMessage = ({ message, isTyping = false }) => {
  const isUser = message?.type === 'user';
  const isAssistant = message?.type === 'assistant';

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isTyping) {
    return (
      <div className="flex justify-start mb-4">
        <div className="flex items-start space-x-3 max-w-[80%]">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary shrink-0">
            <Icon name="Bot" size={16} color="white" />
          </div>
          <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-start space-x-3 max-w-[80%]">
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3">
            <p className="text-sm leading-relaxed">{message?.content}</p>
            {message?.timestamp && (
              <p className="text-xs opacity-70 mt-1">{formatTime(message?.timestamp)}</p>
            )}
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 shrink-0">
            <Icon name="User" size={16} className="text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (isAssistant) {
    return (
      <div className="flex justify-start mb-4">
        <div className="flex items-start space-x-3 max-w-[80%]">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary shrink-0">
            <Icon name="Bot" size={16} color="white" />
          </div>
          <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{message?.content}</p>
            
            {/* Rich content for college cards */}
            {message?.collegeCard && (
              <div className="mt-3 p-3 bg-background rounded-lg border border-border/40">
                <div className="flex items-start space-x-3">
                  <Image 
                    src={message?.collegeCard?.image} 
                    alt={message?.collegeCard?.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{message?.collegeCard?.name}</h4>
                    <p className="text-xs text-muted-foreground">{message?.collegeCard?.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                        {message?.collegeCard?.rating} ★
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ₹{message?.collegeCard?.fees}/year
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Career pathway visualization */}
            {message?.careerPath && (
              <div className="mt-3 p-3 bg-background rounded-lg border border-border/40">
                <h4 className="font-semibold text-foreground text-sm mb-2">Career Path</h4>
                <div className="flex items-center space-x-2">
                  {message?.careerPath?.steps?.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                          <Icon name={step?.icon} size={14} className="text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground">{step?.label}</p>
                      </div>
                      {index < message?.careerPath?.steps?.length - 1 && (
                        <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {message?.timestamp && (
              <p className="text-xs text-muted-foreground/70 mt-2">{formatTime(message?.timestamp)}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatMessage;