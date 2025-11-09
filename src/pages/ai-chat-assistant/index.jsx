import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import QuickSuggestions from './components/QuickSuggestions';
import ChatHistory from './components/ChatHistory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AIChatAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: currentLanguage === 'hi' 
        ? "नमस्ते! मैं आपका AI करियर सलाहकार हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
        : currentLanguage === 'ur'
        ? "السلام علیکم! میں آپ کا AI کیریئر مشیر ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟" 
        : "Hi! I'm your AI career advisor. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState('current');

  // Mock conversation data
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
    }
  ];

  // AI Response templates based on language
  const getAIResponses = (language) => {
    const responses = {
      en: [
        "That's a great question! Based on your profile, I'd recommend focusing on your strengths in analytical thinking. Engineering streams like Computer Science, Electronics, or Mechanical could be excellent choices for you.",
        "I can help you with that. Let me analyze your current progress and suggest the best next steps. For medical entrance exams, consistent practice and understanding concepts is key.",
        "Excellent choice! This aligns well with your interests and aptitude scores. Here are some top colleges in Kashmir:\n\n• NIT Srinagar - Computer Science\n• Government Medical College Srinagar\n• University of Kashmir - Various streams",
        "I understand your concern. Many students feel this way. Let me break this down into manageable steps:\n\n1. Complete your aptitude assessment\n2. Explore career options\n3. Research colleges\n4. Plan your timeline",
        "Based on your assessment results, here are some personalized recommendations for you. Would you like me to show you specific colleges or career paths?"
      ],
      hi: [
        "यह एक बेहतरीन सवाल है! आपकी प्रोफाइल के आधार पर, मैं आपको विश्लेषणात्मक सोच में अपनी ताकत पर ध्यान देने की सलाह दूंगा।",
        "मैं इसमें आपकी मदद कर सकता हूं। आइए आपकी वर्तमान प्रगति का विश्लेषण करें और सबसे अच्छे अगले कदम सुझाएं।",
        "उत्कृष्ट विकल्प! यह आपकी रुचियों और योग्यता स्कोर के साथ अच्छी तरह मेल खाता है।",
        "मैं आपकी चिंता समझता हूं। कई छात्र ऐसा महसूस करते हैं। आइए इसे प्रबंधनीय चरणों में विभाजित करें।",
        "आपके मूल्यांकन परिणामों के आधार पर, यहां आपके लिए कुछ व्यक्तिगत सिफारिशें हैं।"
      ],
      ur: [
        "یہ ایک بہترین سوال ہے! آپ کے پروفائل کی بنیاد پر، میں آپ کو تجزیاتی سوچ میں اپنی طاقت پر توجہ دینے کا مشورہ دوں گا۔",
        "میں اس میں آپ کی مدد کر سکتا ہوں۔ آئیے آپ کی موجودہ پیش قدمی کا تجزیہ کریں اور بہترین اگلے قدم تجویز کریں۔",
        "بہترین انتخاب! یہ آپ کی دلچسپیوں اور صلاحیت کے اسکور کے ساتھ اچھی طرح میل کھاتا ہے۔",
        "میں آپ کی فکر سمجھتا ہوں۔ بہت سے طلباء ایسا محسوس کرتے ہیں۔ آئیے اسے قابل انتظام مراحل میں تقسیم کریں۔",
        "آپ کے تشخیصی نتائج کی بنیاد پر، یہاں آپ کے لیے کچھ ذاتی سفارشات ہیں۔"
      ]
    };
    return responses?.[language] || responses?.en;
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', currentLanguage);
    // Update welcome message when language changes
    setMessages(prev => prev?.map((msg, index) => 
      index === 0 ? {
        ...msg,
        content: currentLanguage === 'hi' 
          ? "नमस्ते! मैं आपका AI करियर सलाहकार हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
          : currentLanguage === 'ur'
          ? "السلام علیکم! میں آپ کا AI کیریئر مشیر ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟" 
          : "Hi! I'm your AI career advisor. How can I help you today?"
      } : msg
    ));
  }, [currentLanguage]);

  const handleSendMessage = async (messageContent) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = getAIResponses(currentLanguage);
      let assistantResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses?.[Math.floor(Math.random() * responses?.length)],
        timestamp: new Date()
      };

      // Add rich content based on message context
      if (messageContent?.toLowerCase()?.includes('college') || messageContent?.toLowerCase()?.includes('कॉलेज') || messageContent?.toLowerCase()?.includes('کالج')) {
        assistantResponse.collegeCard = {
          name: 'NIT Srinagar',
          location: 'Srinagar, Jammu & Kashmir',
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
          rating: '4.2',
          fees: '1,50,000'
        };
      }

      if (messageContent?.toLowerCase()?.includes('career') || messageContent?.toLowerCase()?.includes('करियर') || messageContent?.toLowerCase()?.includes('کیریئر')) {
        assistantResponse.careerPath = {
          steps: [
            { label: '10+2', icon: 'BookOpen' },
            { label: 'Entrance', icon: 'Target' },
            { label: 'Degree', icon: 'GraduationCap' },
            { label: 'Career', icon: 'Briefcase' }
          ]
        };
      }

      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: currentLanguage === 'hi' 
          ? "नमस्ते! मैं आपका AI करियर सलाहकार हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
          : currentLanguage === 'ur'
          ? "السلام علیکم! میں آپ کا AI کیریئر مشیر ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟" 
          : "Hi! I'm your AI career advisor. How can I help you today?",
        timestamp: new Date()
      }
    ]);
  };

  const handleNewConversation = () => {
    handleClearChat();
    setCurrentConversationId('new-' + Date.now());
    setIsHistoryOpen(false);
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
    setIsHistoryOpen(false);
    // In a real app, load conversation messages here
  };

  const handleDeleteConversation = (conversationId) => {
    // In a real app, delete conversation from backend
    console.log('Delete conversation:', conversationId);
  };

  const getContextualSuggestions = () => {
    const suggestions = {
      en: [
        { id: 1, text: "What career options match my interests?", icon: 'Compass', category: 'career' },
        { id: 2, text: "Help me find colleges for engineering", icon: 'GraduationCap', category: 'college' },
        { id: 3, text: "Tell me about available scholarships", icon: 'Award', category: 'scholarship' },
        { id: 4, text: "Which stream should I choose after 10th?", icon: 'BookOpen', category: 'guidance' }
      ],
      hi: [
        { id: 1, text: "मेरी रुचियों से मेल खाने वाले करियर विकल्प क्या हैं?", icon: 'Compass', category: 'career' },
        { id: 2, text: "इंजीनियरिंग के लिए कॉलेज खोजने में मदद करें", icon: 'GraduationCap', category: 'college' },
        { id: 3, text: "उपलब्ध छात्रवृत्ति के बारे में बताएं", icon: 'Award', category: 'scholarship' },
        { id: 4, text: "10वीं के बाद कौन सा स्ट्रीम चुनना चाहिए?", icon: 'BookOpen', category: 'guidance' }
      ],
      ur: [
        { id: 1, text: "میری دلچسپیوں سے میل کھانے والے کیریئر کے اختیارات کیا ہیں؟", icon: 'Compass', category: 'career' },
        { id: 2, text: "انجینئرنگ کے لیے کالج تلاش کرنے میں مدد کریں", icon: 'GraduationCap', category: 'college' },
        { id: 3, text: "دستیاب وظائف کے بارے میں بتائیں", icon: 'Award', category: 'scholarship' },
        { id: 4, text: "10ویں کے بعد کون سا سٹریم منتخب کرنا چاہیے؟", icon: 'BookOpen', category: 'guidance' }
      ]
    };
    return suggestions?.[currentLanguage] || suggestions?.en;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chat History Sidebar */}
        {isHistoryOpen && (
          <div className="w-80 border-r border-border/40 bg-muted/20 overflow-hidden">
            <ChatHistory
              conversations={mockConversations}
              currentConversationId={currentConversationId}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
              className="h-full p-4"
            />
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <ChatHeader
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onClearChat={handleClearChat}
            onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
            isHistoryOpen={isHistoryOpen}
          />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {/* Welcome Section */}
            {messages?.length === 1 && (
              <div className="text-center py-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4">
                  <Icon name="Bot" size={32} color="white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {currentLanguage === 'hi' ? 'AI करियर सलाहकार' : 
                   currentLanguage === 'ur'? 'AI کیریئر مشیر' : 'AI Career Advisor'}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  {currentLanguage === 'hi' ? 'मैं आपको करियर मार्गदर्शन, कॉलेज खोज, और शैक्षणिक योजना में मदद कर सकता हूं।' :
                   currentLanguage === 'ur'? 'میں آپ کو کیریئر رہنمائی، کالج تلاش، اور تعلیمی منصوبہ بندی میں مدد کر سکتا ہوں۔' : 'I can help you with career guidance, college search, and educational planning.'}
                </p>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Brain"
                    iconPosition="left"
                    onClick={() => navigate('/aptitude-assessment')}
                    className="text-primary border-primary/20 hover:bg-primary/10"
                  >
                    {currentLanguage === 'hi' ? 'मूल्यांकन' : 
                     currentLanguage === 'ur'? 'تشخیص' : 'Assessment'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Compass"
                    iconPosition="left"
                    onClick={() => navigate('/career-exploration')}
                    className="text-secondary border-secondary/20 hover:bg-secondary/10"
                  >
                    {currentLanguage === 'hi' ? 'करियर' : 
                     currentLanguage === 'ur'? 'کیریئر' : 'Careers'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="GraduationCap"
                    iconPosition="left"
                    onClick={() => navigate('/college-details')}
                    className="text-accent border-accent/20 hover:bg-accent/10"
                  >
                    {currentLanguage === 'hi' ? 'कॉलेज' : 
                     currentLanguage === 'ur'? 'کالج' : 'Colleges'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => navigate('/timeline-tracker')}
                    className="text-success border-success/20 hover:bg-success/10"
                  >
                    {currentLanguage === 'hi' ? 'समयसीमा' : 
                     currentLanguage === 'ur'? 'ٹائم لائن' : 'Timeline'}
                  </Button>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages?.map((message) => (
              <ChatMessage key={message?.id} message={message} />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <ChatMessage 
                isTyping={true} 
                message={{
                  id: 'typing',
                  type: 'assistant',
                  content: '',
                  timestamp: new Date()
                }} 
              />
            )}

            {/* Quick Suggestions */}
            {messages?.length <= 2 && !isTyping && (
              <QuickSuggestions
                suggestions={getContextualSuggestions()}
                onSuggestionClick={handleSendMessage}
                className="mt-6"
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-border/40 bg-background p-4">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              placeholder={
                currentLanguage === 'hi' ? 'अपने करियर के बारे में कुछ भी पूछें...' :
                currentLanguage === 'ur'? 'اپنے کیریئر کے بارے میں کچھ بھی پوچھیں...' : 'Ask me anything about your career...'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;