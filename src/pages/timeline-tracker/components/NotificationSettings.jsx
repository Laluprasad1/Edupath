import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettings = ({ isOpen, onClose, settings, onSettingsUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const notificationTypes = [
    {
      id: 'admission',
      label: 'Admission Deadlines',
      description: 'Get notified about college admission deadlines',
      icon: 'GraduationCap',
      color: 'primary'
    },
    {
      id: 'scholarship',
      label: 'Scholarship Applications',
      description: 'Alerts for scholarship application deadlines',
      icon: 'Award',
      color: 'success'
    },
    {
      id: 'exam',
      label: 'Entrance Exams',
      description: 'Reminders for exam registration and dates',
      icon: 'BookOpen',
      color: 'warning'
    },
    {
      id: 'document',
      label: 'Document Submissions',
      description: 'Alerts for document submission deadlines',
      icon: 'FileText',
      color: 'accent'
    },
    {
      id: 'interview',
      label: 'Interview Schedules',
      description: 'Notifications for interview appointments',
      icon: 'Users',
      color: 'secondary'
    },
    {
      id: 'result',
      label: 'Result Announcements',
      description: 'Get notified when results are declared',
      icon: 'Trophy',
      color: 'error'
    }
  ];

  const reminderTimes = [
    { value: '1', label: '1 day before' },
    { value: '3', label: '3 days before' },
    { value: '7', label: '1 week before' },
    { value: '14', label: '2 weeks before' },
    { value: '30', label: '1 month before' }
  ];

  const notificationMethods = [
    {
      id: 'push',
      label: 'Push Notifications',
      description: 'Browser notifications on this device',
      icon: 'Bell'
    },
    {
      id: 'email',
      label: 'Email Notifications',
      description: 'Send alerts to your email address',
      icon: 'Mail'
    },
    {
      id: 'sms',
      label: 'SMS Alerts',
      description: 'Text messages to your mobile number',
      icon: 'MessageSquare'
    }
  ];

  const handleTypeToggle = (typeId) => {
    setLocalSettings(prev => ({
      ...prev,
      types: {
        ...prev?.types,
        [typeId]: !prev?.types?.[typeId]
      }
    }));
  };

  const handleMethodToggle = (methodId) => {
    setLocalSettings(prev => ({
      ...prev,
      methods: {
        ...prev?.methods,
        [methodId]: !prev?.methods?.[methodId]
      }
    }));
  };

  const handleReminderTimeChange = (typeId, time) => {
    setLocalSettings(prev => ({
      ...prev,
      reminderTimes: {
        ...prev?.reminderTimes,
        [typeId]: time
      }
    }));
  };

  const handleSave = () => {
    onSettingsUpdate(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings = {
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
    };
    setLocalSettings(defaultSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl border border-border/40 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Icon name="Settings" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notification Settings</h2>
              <p className="text-sm text-muted-foreground">Customize your reminder preferences</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={16}
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Notification Types */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Event Categories</h3>
              <div className="space-y-4">
                {notificationTypes?.map(type => (
                  <div key={type?.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 border border-border/20">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      type?.color === 'primary' ? 'bg-primary/10' :
                      type?.color === 'success' ? 'bg-success/10' :
                      type?.color === 'warning' ? 'bg-warning/10' :
                      type?.color === 'accent' ? 'bg-accent/10' :
                      type?.color === 'secondary'? 'bg-secondary/10' : 'bg-error/10'
                    }`}>
                      <Icon 
                        name={type?.icon} 
                        size={16} 
                        className={`${
                          type?.color === 'primary' ? 'text-primary' :
                          type?.color === 'success' ? 'text-success' :
                          type?.color === 'warning' ? 'text-warning' :
                          type?.color === 'accent' ? 'text-accent' :
                          type?.color === 'secondary'? 'text-secondary' : 'text-error'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{type?.label}</h4>
                        <Checkbox
                          checked={localSettings?.types?.[type?.id]}
                          onChange={() => handleTypeToggle(type?.id)}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{type?.description}</p>
                      
                      {localSettings?.types?.[type?.id] && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Remind me:</span>
                          <select
                            value={localSettings?.reminderTimes?.[type?.id]}
                            onChange={(e) => handleReminderTimeChange(type?.id, e?.target?.value)}
                            className="text-xs px-2 py-1 rounded border border-border/40 bg-background text-foreground"
                          >
                            {reminderTimes?.map(time => (
                              <option key={time?.value} value={time?.value}>
                                {time?.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Methods */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Delivery Methods</h3>
              <div className="space-y-3">
                {notificationMethods?.map(method => (
                  <div key={method?.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/20">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
                        <Icon name={method?.icon} size={16} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{method?.label}</h4>
                        <p className="text-sm text-muted-foreground">{method?.description}</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={localSettings?.methods?.[method?.id]}
                      onChange={() => handleMethodToggle(method?.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet Hours */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Quiet Hours</h3>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">Do Not Disturb</h4>
                    <p className="text-sm text-muted-foreground">Pause notifications during specified hours</p>
                  </div>
                  <Checkbox
                    checked={localSettings?.quietHours?.enabled}
                    onChange={() => setLocalSettings(prev => ({
                      ...prev,
                      quietHours: {
                        ...prev?.quietHours,
                        enabled: !prev?.quietHours?.enabled
                      }
                    }))}
                  />
                </div>
                
                {localSettings?.quietHours?.enabled && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">From:</span>
                      <input
                        type="time"
                        value={localSettings?.quietHours?.start}
                        onChange={(e) => setLocalSettings(prev => ({
                          ...prev,
                          quietHours: {
                            ...prev?.quietHours,
                            start: e?.target?.value
                          }
                        }))}
                        className="px-2 py-1 rounded border border-border/40 bg-background text-foreground text-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">To:</span>
                      <input
                        type="time"
                        value={localSettings?.quietHours?.end}
                        onChange={(e) => setLocalSettings(prev => ({
                          ...prev,
                          quietHours: {
                            ...prev?.quietHours,
                            end: e?.target?.value
                          }
                        }))}
                        className="px-2 py-1 rounded border border-border/40 bg-background text-foreground text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border/40 bg-muted/20">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground"
          >
            Reset to Default
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;