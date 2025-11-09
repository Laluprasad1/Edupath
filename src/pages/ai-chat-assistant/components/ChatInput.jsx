import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Ask me anything about your career...",
  className = '' 
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const inputRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const handleSendMessage = () => {
    if (!message?.trim() || disabled) return;
    
    onSendMessage(message?.trim());
    setMessage('');
    inputRef?.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // Simulate voice recording - in real app, integrate with Web Speech API
    setTimeout(() => {
      stopRecording();
      setMessage("What are the best engineering colleges in Kashmir?");
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    
    if (recordingIntervalRef?.current) {
      clearInterval(recordingIntervalRef?.current);
      recordingIntervalRef.current = null;
    }
  };

  const formatRecordingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center space-x-3 p-3 bg-error/10 rounded-lg border border-error/20">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm font-medium text-error">
            Recording... {formatRecordingTime(recordingTime)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="Square"
            iconSize={16}
            onClick={stopRecording}
            className="text-error hover:bg-error/10"
          >
            Stop
          </Button>
        </div>
      )}
      {/* Input Area */}
      <div className="flex items-end space-x-2">
        {/* Voice Input Button */}
        <Button
          variant="outline"
          size="default"
          iconName={isRecording ? "MicOff" : "Mic"}
          iconSize={20}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled}
          className={`shrink-0 ${isRecording ? 'border-error text-error hover:bg-error/10' : 'border-primary text-primary hover:bg-primary/10'}`}
        />

        {/* Text Input */}
        <div className="flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled || isRecording}
            className="resize-none"
          />
        </div>

        {/* Send Button */}
        <Button
          variant="default"
          size="default"
          iconName="Send"
          iconSize={20}
          onClick={handleSendMessage}
          disabled={disabled || !message?.trim() || isRecording}
          className="shrink-0"
        />
      </div>
      {/* Input Helper Text */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Icon name="Keyboard" size={12} />
            <span>Press Enter to send</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Mic" size={12} />
            <span>Click to record</span>
          </span>
        </div>
        <span>{message?.length}/500</span>
      </div>
    </div>
  );
};

export default ChatInput;