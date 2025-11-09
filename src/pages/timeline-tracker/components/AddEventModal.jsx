import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    category: '',
    deadline: '',
    priority: 'medium',
    description: '',
    requirements: '',
    applicationUrl: ''
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: 'admission', label: 'Admission Deadline' },
    { value: 'scholarship', label: 'Scholarship Application' },
    { value: 'exam', label: 'Entrance Exam' },
    { value: 'document', label: 'Document Submission' },
    { value: 'interview', label: 'Interview Schedule' },
    { value: 'result', label: 'Result Declaration' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData?.institution?.trim()) {
      newErrors.institution = 'Institution name is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData?.deadline) {
      newErrors.deadline = 'Deadline date is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: formData?.title?.trim(),
      institution: formData?.institution?.trim(),
      category: formData?.category,
      deadline: formData?.deadline,
      priority: formData?.priority,
      description: formData?.description?.trim(),
      requirements: formData?.requirements?.trim() 
        ? formData?.requirements?.split('\n')?.map(req => req?.trim())?.filter(req => req)
        : [],
      applicationUrl: formData?.applicationUrl?.trim(),
      completed: false,
      progress: 0,
      checklist: []
    };

    onAddEvent(newEvent);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      institution: '',
      category: '',
      deadline: '',
      priority: 'medium',
      description: '',
      requirements: '',
      applicationUrl: ''
    });
    setErrors({});
    onClose();
  };

  const getTodayDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl border border-border/40 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Icon name="Plus" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Add New Event</h2>
              <p className="text-sm text-muted-foreground">Create a new timeline event</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={16}
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Event Title"
                  type="text"
                  placeholder="e.g., JEE Main Application Deadline"
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  error={errors?.title}
                  required
                  className="md:col-span-2"
                />

                <Input
                  label="Institution/Organization"
                  type="text"
                  placeholder="e.g., National Testing Agency"
                  value={formData?.institution}
                  onChange={(e) => handleInputChange('institution', e?.target?.value)}
                  error={errors?.institution}
                  required
                />

                <Select
                  label="Category"
                  placeholder="Select event category"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                  error={errors?.category}
                  required
                />

                <Input
                  label="Deadline Date"
                  type="date"
                  value={formData?.deadline}
                  onChange={(e) => handleInputChange('deadline', e?.target?.value)}
                  error={errors?.deadline}
                  min={getTodayDate()}
                  required
                />

                <Select
                  label="Priority Level"
                  options={priorityOptions}
                  value={formData?.priority}
                  onChange={(value) => handleInputChange('priority', value)}
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Additional Details</h3>
              
              <Input
                label="Description"
                type="text"
                placeholder="Brief description of the event"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                description="Optional: Provide additional context about this event"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Required Documents
                </label>
                <textarea
                  placeholder="List required documents (one per line)&#10;e.g.,&#10;10th Mark Sheet&#10;12th Mark Sheet&#10;Passport Size Photos"
                  value={formData?.requirements}
                  onChange={(e) => handleInputChange('requirements', e?.target?.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-border/40 rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter each document on a new line
                </p>
              </div>

              <Input
                label="Application URL"
                type="url"
                placeholder="https://example.com/apply"
                value={formData?.applicationUrl}
                onChange={(e) => handleInputChange('applicationUrl', e?.target?.value)}
                description="Optional: Direct link to application portal"
              />
            </div>

            {/* Preview */}
            {formData?.title && formData?.category && (
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Preview</h3>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/20">
                  <div className="flex items-start space-x-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      formData?.category === 'admission' ? 'bg-primary/10' :
                      formData?.category === 'scholarship' ? 'bg-success/10' :
                      formData?.category === 'exam' ? 'bg-warning/10' :
                      formData?.category === 'document' ? 'bg-accent/10' :
                      formData?.category === 'interview'? 'bg-secondary/10' : 'bg-error/10'
                    }`}>
                      <Icon 
                        name={
                          formData?.category === 'admission' ? 'GraduationCap' :
                          formData?.category === 'scholarship' ? 'Award' :
                          formData?.category === 'exam' ? 'BookOpen' :
                          formData?.category === 'document' ? 'FileText' :
                          formData?.category === 'interview'? 'Users' : 'Trophy'
                        } 
                        size={16} 
                        className={`${
                          formData?.category === 'admission' ? 'text-primary' :
                          formData?.category === 'scholarship' ? 'text-success' :
                          formData?.category === 'exam' ? 'text-warning' :
                          formData?.category === 'document' ? 'text-accent' :
                          formData?.category === 'interview'? 'text-secondary' : 'text-error'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{formData?.title}</h4>
                      <p className="text-sm text-muted-foreground">{formData?.institution}</p>
                      {formData?.deadline && (
                        <p className="text-sm text-accent mt-1">
                          Due: {new Date(formData.deadline)?.toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border/40 bg-muted/20">
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;