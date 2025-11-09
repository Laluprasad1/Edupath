import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    // Check theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    // Check user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'LayoutDashboard',
      description: 'Your personalized learning hub'
    },
    {
      label: 'Assessment',
      path: '/aptitude-assessment',
      icon: 'Brain',
      description: 'Discover your strengths'
    },
    {
      label: 'Explore',
      path: '/career-exploration',
      icon: 'Compass',
      description: 'Find your career path'
    },
    {
      label: 'Timeline',
      path: '/timeline-tracker',
      icon: 'Calendar',
      description: 'Track your progress'
    }
  ];

  const secondaryItems = [
    {
      label: 'College Details',
      path: '/college-details',
      icon: 'GraduationCap'
    },
    {
      label: 'AI Assistant',
      path: '/ai-chat-assistant',
      icon: 'MessageCircle'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="glass-nav sticky top-0 z-100 w-full border-b border-border/40">
  <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link 
            to="/student-dashboard" 
            className="flex items-center space-x-2 focus-ring rounded-lg p-1 transition-colors hover:bg-accent/10"
            onClick={closeMobileMenu}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">EduPath</h1>
              <p className="text-xs text-muted-foreground -mt-1">Advisor</p>
            </div>
          </Link>
        </div>

  {/* Desktop Navigation */}
  <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`group relative flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/10 focus-ring ${
                isActivePath(item?.path)
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={18} 
                className={`transition-colors ${
                  isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              />
              <span>{item?.label}</span>
              {isActivePath(item?.path) && (
                <div className="absolute -bottom-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

  {/* Desktop More Menu & Auth Buttons */}
  <div className="hidden lg:flex items-center space-x-2">
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              iconSize={18}
              className="text-muted-foreground hover:text-foreground"
            >
              More
            </Button>
            <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-200">
              <div className="glass-card rounded-lg border border-border/40 py-2 shadow-elevation-3">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors hover:bg-accent/10 ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Dark/Light Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName={theme === 'dark' ? 'Sun' : 'Moon'}
            iconSize={18}
            onClick={handleThemeToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Button>

          {/* Auth Buttons/User Info */}
          {!user ? (
            <>
              <Link to="/auth/login">
                <Button variant="neon" size="sm" className="mx-1">Sign In</Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="neon" size="sm" className="mx-1">Sign Up</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-primary">{user.name}</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>Sign Out</Button>
            </div>
          )}
        </div>

  {/* Mobile Menu Button & Theme Toggle */}
        <div className="lg:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={theme === 'dark' ? 'Sun' : 'Moon'}
            iconSize={18}
            onClick={handleThemeToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={20}
            onClick={toggleMobileMenu}
            className="text-muted-foreground hover:text-foreground"
          >
            Menu
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border/40 glass-card">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-accent/10 focus-ring ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground'}
                />
                <div className="flex-1">
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs text-muted-foreground">{item?.description}</div>
                </div>
                {isActivePath(item?.path) && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </Link>
            ))}
            
            <div className="border-t border-border/40 pt-2 mt-2">
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent/10 focus-ring ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;