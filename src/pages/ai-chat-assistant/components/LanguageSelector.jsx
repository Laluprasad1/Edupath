import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = ({ 
  currentLanguage = 'en', 
  onLanguageChange,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      direction: 'ltr'
    },
    {
      code: 'ur',
      name: 'Urdu',
      nativeName: 'اردو',
      flag: '🇵🇰',
      direction: 'rtl'
    }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground border-border/40"
      >
        <span className="text-base">{currentLang?.flag}</span>
        <span className="text-sm font-medium">{currentLang?.name}</span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="transition-transform duration-200"
        />
      </Button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-48 glass-card rounded-lg border border-border/40 shadow-elevation-3 z-50">
            <div className="py-2">
              {languages?.map((language) => (
                <button
                  key={language?.code}
                  onClick={() => handleLanguageSelect(language?.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-accent/10 ${
                    currentLanguage === language?.code
                      ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                  dir={language?.direction}
                >
                  <span className="text-base">{language?.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language?.name}</div>
                    <div className="text-xs opacity-70">{language?.nativeName}</div>
                  </div>
                  {currentLanguage === language?.code && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-border/40 px-4 py-2">
              <p className="text-xs text-muted-foreground">
                Language changes apply to new messages
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;