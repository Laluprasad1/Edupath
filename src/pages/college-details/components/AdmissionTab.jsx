import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdmissionTab = ({ admissionInfo }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-success bg-success/10';
      case 'closing-soon': return 'text-warning bg-warning/10';
      case 'closed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Application Timeline */}
      <div className="glass-card rounded-lg border border-border/40 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Application Timeline</h3>
        <div className="space-y-4">
          {admissionInfo?.timeline?.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                event?.completed ? 'bg-success text-white' : event?.current ?'bg-primary text-white': 'bg-muted text-muted-foreground'
              }`}>
                {event?.completed ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${
                    event?.current ? 'text-primary' : 'text-foreground'
                  }`}>
                    {event?.title}
                  </h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event?.status)}`}>
                    {event?.status === 'open' ? 'Open' :
                     event?.status === 'closing-soon' ? 'Closing Soon' :
                     event?.status === 'closed' ? 'Closed' : 'Upcoming'}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{event?.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>Start: {formatDate(event?.startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>End: {formatDate(event?.endDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Selection Process */}
      <div className="glass-card rounded-lg border border-border/40 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Selection Process</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {admissionInfo?.selectionProcess?.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                <Icon name={step?.icon} size={24} />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{step?.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step?.description}</p>
              {step?.weightage && (
                <div className="mt-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {step?.weightage}% weightage
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Required Documents */}
      <div className="glass-card rounded-lg border border-border/40 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Required Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {admissionInfo?.requiredDocuments?.map((doc, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon name="FileText" size={18} className="text-primary" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{doc?.name}</p>
                <p className="text-sm text-muted-foreground">{doc?.description}</p>
              </div>
              {doc?.required && (
                <span className="text-xs font-medium text-error bg-error/10 px-2 py-1 rounded-full">
                  Required
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Application Fees */}
      <div className="glass-card rounded-lg border border-border/40 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Application Fees</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {admissionInfo?.applicationFees?.map((fee, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-1">{fee?.category}</h4>
              <p className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0
                })?.format(fee?.amount)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{fee?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Important Notes */}
      <div className="glass-card rounded-lg border border-border/40 p-6 bg-warning/5">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-3">Important Notes</h3>
            <ul className="space-y-2">
              {admissionInfo?.importantNotes?.map((note, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Icon name="Dot" size={16} className="mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          iconName="ExternalLink"
          iconPosition="left"
          className="flex-1"
        >
          Apply Online
        </Button>
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Download Prospectus
        </Button>
        <Button
          variant="outline"
          iconName="Phone"
          iconPosition="left"
          className="flex-1"
        >
          Contact Admissions
        </Button>
      </div>
    </div>
  );
};

export default AdmissionTab;