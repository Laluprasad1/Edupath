import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatHistory = ({ 
  conversations = [], 
  currentConversationId, 
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const mockConversations = [
    {
      id: 'conv-1',
      title: 'Engineering Career Options',
      lastMessage: 'What are the best engineering colleges in Kashmir?',
      timestamp: new Date(Date.now() - 3600000),
      messageCount: 12,
      category: 'career'
    },
    {
      id: 'conv-2',
      title: 'Medical Stream Guidance',
      lastMessage: 'Tell me about NEET preparation',
      timestamp: new Date(Date.now() - 7200000),
      messageCount: 8,
      category: 'education'
    },
    {
      id: 'conv-3',
      title: 'Scholarship Information',
      lastMessage: 'Available scholarships for minorities',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 5,
      category: 'scholarship'
    },
    {
      id: 'conv-4',
      title: 'Commerce Stream Options',
      lastMessage: 'CA vs MBA which is better?',
      timestamp: new Date(Date.now() - 172800000),
      messageCount: 15,
      category: 'career'
    }
  ];

  const activeConversations = conversations?.length > 0 ? conversations : mockConversations;

  const filteredConversations = activeConversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp?.toLocaleDateString();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      career: 'Compass',
      education: 'BookOpen',
      scholarship: 'Award',
      college: 'GraduationCap'
    };
    return icons?.[category] || 'MessageCircle';
  };

  const getCategoryColor = (category) => {
    const colors = {
      career: 'text-primary',
      education: 'text-secondary',
      scholarship: 'text-success',
      college: 'text-accent'
    };
    return colors?.[category] || 'text-muted-foreground';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} className="text-foreground" />
          <h3 className="font-semibold text-foreground">Chat History</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconSize={16}
            onClick={onNewConversation}
            className="text-primary border-primary/20 hover:bg-primary/10"
          >
            New
          </Button>
        </div>
      </div>
      {/* Search */}
      {isExpanded && (
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />

          {/* Conversations List */}
          <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
            {filteredConversations?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No conversations found</p>
              </div>
            ) : (
              filteredConversations?.map((conversation) => (
                <div
                  key={conversation?.id}
                  className={`group p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-elevation-1 ${
                    currentConversationId === conversation?.id
                      ? 'bg-primary/10 border-primary/20' :'bg-background border-border/40 hover:bg-muted/50'
                  }`}
                  onClick={() => onSelectConversation(conversation?.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <Icon 
                        name={getCategoryIcon(conversation?.category)} 
                        size={16} 
                        className={`mt-0.5 shrink-0 ${getCategoryColor(conversation?.category)}`}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {conversation?.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {conversation?.lastMessage}
                        </p>
                        <div className="flex items-center space-x-3 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(conversation?.timestamp)}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center space-x-1">
                            <Icon name="MessageSquare" size={10} />
                            <span>{conversation?.messageCount}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        iconSize={14}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onDeleteConversation(conversation?.id);
                        }}
                        className="text-error hover:bg-error/10"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;