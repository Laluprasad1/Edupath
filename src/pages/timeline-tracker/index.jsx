import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AIFloatingAssistant from '../../components/ui/AIFloatingAssistant';
import TimelineView from './components/TimelineView';
import CalendarView from './components/CalendarView';
import FilterControls from './components/FilterControls';
import NotificationSettings from './components/NotificationSettings';
import AddEventModal from './components/AddEventModal';

const TimelineTracker = () => {
  const [viewMode, setViewMode] = useState('timeline');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [events, setEvents] = useState([]);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    types: {
      admission: true,
      scholarship: true,
      exam: true,
      document: false,
      interview: true,
      result: true
    },
    methods: {
      push: true,
      email: false,
      sms: false
    },
    reminderTimes: {
      admission: '7',
      scholarship: '14',
      exam: '3',
      document: '1',
      interview: '1',
      result: '1'
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  // Mock events data
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "JEE Main Application Deadline",
        institution: "National Testing Agency",
        category: "exam",
        deadline: "2025-01-15",
        priority: "high",
        description: "Joint Entrance Examination (Main) application deadline for engineering admissions",
        requirements: ["10th Mark Sheet", "12th Mark Sheet", "Passport Size Photos", "Category Certificate"],
        applicationUrl: "https://jeemain.nta.nic.in",
        completed: false,
        progress: 75,
        checklist: [
          { task: "Fill application form", completed: true },
          { task: "Upload documents", completed: true },
          { task: "Pay application fee", completed: true },
          { task: "Submit application", completed: false }
        ]
      },
      {
        id: 2,
        title: "NEET UG Registration",
        institution: "National Testing Agency",
        category: "exam",
        deadline: "2025-01-20",
        priority: "high",
        description: "National Eligibility cum Entrance Test for medical admissions",
        requirements: ["10th Mark Sheet", "12th Mark Sheet", "Passport Size Photos"],
        applicationUrl: "https://neet.nta.nic.in",
        completed: false,
        progress: 25,
        checklist: [
          { task: "Create account", completed: true },
          { task: "Fill personal details", completed: false },
          { task: "Upload documents", completed: false },
          { task: "Pay fee and submit", completed: false }
        ]
      },
      {
        id: 3,
        title: "Merit Scholarship Application",
        institution: "Ministry of Education",
        category: "scholarship",
        deadline: "2025-02-28",
        priority: "medium",
        description: "Central Sector Scheme of Scholarship for College and University Students",
        requirements: ["Income Certificate", "12th Mark Sheet", "Bank Details", "Aadhar Card"],
        applicationUrl: "https://scholarships.gov.in",
        completed: false,
        progress: 0,
        checklist: []
      },
      {
        id: 4,
        title: "Delhi University Admission",
        institution: "University of Delhi",
        category: "admission",
        deadline: "2025-03-15",
        priority: "high",
        description: "Undergraduate admission application for various courses",
        requirements: ["12th Mark Sheet", "Character Certificate", "Migration Certificate"],
        applicationUrl: "https://du.ac.in",
        completed: false,
        progress: 50,
        checklist: [
          { task: "Register on portal", completed: true },
          { task: "Choose courses", completed: true },
          { task: "Upload documents", completed: false },
          { task: "Pay application fee", completed: false }
        ]
      },
      {
        id: 5,
        title: "IIT JEE Advanced Result",
        institution: "Indian Institute of Technology",
        category: "result",
        deadline: "2025-06-15",
        priority: "medium",
        description: "JEE Advanced result declaration for IIT admissions",
        requirements: [],
        applicationUrl: "",
        completed: false,
        progress: 0,
        checklist: []
      },
      {
        id: 6,
        title: "Document Verification - NIT",
        institution: "National Institute of Technology",
        category: "document",
        deadline: "2025-07-10",
        priority: "high",
        description: "Document verification for NIT admission process",
        requirements: ["Original Certificates", "Rank Card", "Counselling Letter"],
        applicationUrl: "",
        completed: false,
        progress: 0,
        checklist: []
      },
      {
        id: 7,
        title: "Medical College Interview",
        institution: "AIIMS Delhi",
        category: "interview",
        deadline: "2025-08-05",
        priority: "high",
        description: "Personal interview for MBBS admission",
        requirements: ["Interview Call Letter", "Original Documents", "Passport Photos"],
        applicationUrl: "",
        completed: false,
        progress: 0,
        checklist: []
      },
      {
        id: 8,
        title: "State Scholarship Renewal",
        institution: "State Government",
        category: "scholarship",
        deadline: "2025-04-30",
        priority: "medium",
        description: "Annual renewal of state merit scholarship",
        requirements: ["Previous Year Mark Sheet", "Income Certificate", "Bank Statement"],
        applicationUrl: "",
        completed: true,
        progress: 100,
        checklist: [
          { task: "Submit renewal form", completed: true },
          { task: "Upload documents", completed: true },
          { task: "Verification complete", completed: true }
        ]
      }
    ];

    setEvents(mockEvents);
  }, []);

  const handleEventUpdate = (eventId, updates) => {
    setEvents(prev => prev?.map(event => 
      event?.id === eventId ? { ...event, ...updates } : event
    ));
  };

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const getEventCounts = () => {
    const counts = {
      admission: 0,
      scholarship: 0,
      exam: 0,
      document: 0,
      interview: 0,
      result: 0,
      completed: 0,
      overdue: 0,
      urgent: 0
    };

    const today = new Date();
    today?.setHours(0, 0, 0, 0);

    events?.forEach(event => {
      counts[event.category]++;
      
      if (event?.completed) {
        counts.completed++;
      } else {
        const deadline = new Date(event.deadline);
        const daysUntil = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntil < 0) {
          counts.overdue++;
        } else if (daysUntil <= 7) {
          counts.urgent++;
        }
      }
    });

    return counts;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Filter Controls */}
        <FilterControls
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddEvent={() => setShowAddEventModal(true)}
          eventCounts={getEventCounts()}
        />

        {/* Main Content */}
        <div className="min-h-[600px]">
          {viewMode === 'timeline' ? (
            <TimelineView
              events={events}
              onEventUpdate={handleEventUpdate}
              selectedFilters={selectedFilters}
            />
          ) : (
            <CalendarView
              events={events}
              onEventUpdate={handleEventUpdate}
              selectedFilters={selectedFilters}
            />
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl border border-border/40 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Quick Actions</h3>
              <p className="text-sm text-muted-foreground">
                Manage your timeline and notification preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowNotificationSettings(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors focus-ring"
              >
                <span className="text-sm font-medium">Notification Settings</span>
              </button>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-ring"
              >
                <span className="text-sm font-medium">Add Event</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
        settings={notificationSettings}
        onSettingsUpdate={setNotificationSettings}
      />

      <AddEventModal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onAddEvent={handleAddEvent}
      />

      <AIFloatingAssistant />
    </div>
  );
};

export default TimelineTracker;