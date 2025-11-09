import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ARCareerExplorer = ({ onCareerSelect }) => {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState('office');

  const arEnvironments = [
    {
      id: 'office',
      name: 'Corporate Office',
      description: 'Experience a modern corporate workspace',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      careers: [
        { name: 'Business Analyst', icon: 'BarChart3' },
        { name: 'Project Manager', icon: 'Users' },
        { name: 'Marketing Manager', icon: 'TrendingUp' },
        { name: 'HR Manager', icon: 'Heart' }
      ]
    },
    {
      id: 'laboratory',
      name: 'Research Laboratory',
      description: 'Step into a cutting-edge research facility',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
      careers: [
        { name: 'Research Scientist', icon: 'Microscope' },
        { name: 'Lab Technician', icon: 'TestTube' },
        { name: 'Quality Analyst', icon: 'CheckCircle' },
        { name: 'Biomedical Engineer', icon: 'Heart' }
      ]
    },
    {
      id: 'hospital',
      name: 'Medical Facility',
      description: 'Explore a modern healthcare environment',
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      careers: [
        { name: 'Doctor', icon: 'Stethoscope' },
        { name: 'Nurse', icon: 'Heart' },
        { name: 'Pharmacist', icon: 'Pill' },
        { name: 'Medical Technician', icon: 'Activity' }
      ]
    },
    {
      id: 'studio',
      name: 'Creative Studio',
      description: 'Immerse yourself in a creative workspace',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
      careers: [
        { name: 'Graphic Designer', icon: 'Palette' },
        { name: 'UI/UX Designer', icon: 'Monitor' },
        { name: 'Photographer', icon: 'Camera' },
        { name: 'Video Editor', icon: 'Film' }
      ]
    },
    {
      id: 'tech',
      name: 'Tech Hub',
      description: 'Experience a modern technology workspace',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop',
      careers: [
        { name: 'Software Engineer', icon: 'Code' },
        { name: 'Data Scientist', icon: 'Database' },
        { name: 'Cybersecurity Analyst', icon: 'Shield' },
        { name: 'DevOps Engineer', icon: 'Server' }
      ]
    },
    {
      id: 'workshop',
      name: 'Technical Workshop',
      description: 'Explore hands-on technical work environment',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      careers: [
        { name: 'Mechanical Engineer', icon: 'Cog' },
        { name: 'Electrician', icon: 'Zap' },
        { name: 'Automotive Technician', icon: 'Car' },
        { name: 'Industrial Designer', icon: 'Wrench' }
      ]
    }
  ];

  const currentEnvironment = arEnvironments?.find(env => env.id === selectedEnvironment);

  const handleStartAR = () => {
    setIsARActive(true);
    // In a real implementation, this would initialize AR camera and tracking
  };

  const handleStopAR = () => {
    setIsARActive(false);
  };

  const handleCareerInteraction = (career) => {
    onCareerSelect({
      name: career?.name,
      environment: currentEnvironment?.name,
      salary: '₹5-20 LPA', // Mock data
      demand: 'High',
      growth: 'High'
    });
  };

  return (
    <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/40 bg-gradient-to-r from-secondary/5 to-accent/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10">
              <Icon name="Smartphone" size={16} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AR Career Explorer</h3>
              <p className="text-sm text-muted-foreground">
                Experience careers in immersive environments
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              Beta
            </div>
            {isARActive && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success">AR Active</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isARActive ? (
        /* Environment Selection */
        (<div className="p-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {arEnvironments?.map((environment) => (
              <button
                key={environment?.id}
                onClick={() => setSelectedEnvironment(environment?.id)}
                className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
                  selectedEnvironment === environment?.id
                    ? 'ring-2 ring-primary shadow-elevation-2'
                    : 'hover:shadow-elevation-1'
                }`}
              >
                <div className="aspect-video">
                  <Image
                    src={environment?.image}
                    alt={environment?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="font-medium text-white text-sm">{environment?.name}</h4>
                    <p className="text-xs text-white/80 leading-tight">{environment?.description}</p>
                  </div>
                  {selectedEnvironment === environment?.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} color="white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          {/* Selected Environment Details */}
          {currentEnvironment && (
            <div className="glass-card rounded-lg p-4 border border-border/40">
              <h4 className="font-semibold text-foreground mb-2">{currentEnvironment?.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{currentEnvironment?.description}</p>
              
              <div className="space-y-2">
                <h5 className="font-medium text-foreground text-sm">Careers to Explore:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {currentEnvironment?.careers?.map((career, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
                      <Icon name={career?.icon} size={14} className="text-primary" />
                      <span className="text-sm text-foreground">{career?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* AR Controls */}
          <div className="space-y-3">
            <Button
              variant="default"
              iconName="Play"
              iconPosition="left"
              onClick={handleStartAR}
              className="w-full"
            >
              Start AR Experience
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">
                Point your camera at a flat surface to begin
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Smartphone" size={12} />
                  <span>Mobile Required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Camera" size={12} />
                  <span>Camera Access</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Wifi" size={12} />
                  <span>Internet Connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>)
      ) : (
        /* AR Experience Interface */
        (<div className="relative">
          {/* AR Camera View Simulation */}
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            
            {/* AR Overlay Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-2">
                <Icon name="Scan" size={48} className="mx-auto animate-pulse" />
                <p className="text-lg font-semibold">Scanning Environment...</p>
                <p className="text-sm opacity-80">Move your device to detect surfaces</p>
              </div>
            </div>

            {/* AR Career Objects */}
            <div className="absolute top-4 left-4 space-y-2">
              {currentEnvironment?.careers?.slice(0, 2)?.map((career, index) => (
                <button
                  key={index}
                  onClick={() => handleCareerInteraction(career)}
                  className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-white/30 transition-colors"
                >
                  <Icon name={career?.icon} size={16} />
                  <span className="text-sm font-medium">{career?.name}</span>
                  <Icon name="Info" size={12} />
                </button>
              ))}
            </div>

            {/* AR Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <Button
                variant="ghost"
                iconName="RotateCcw"
                iconSize={20}
                className="text-white hover:bg-white/20"
              />
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  iconName="Camera"
                  iconSize={20}
                  className="text-white hover:bg-white/20"
                />
                <Button
                  variant="ghost"
                  iconName="Share"
                  iconSize={20}
                  className="text-white hover:bg-white/20"
                />
              </div>
              <Button
                variant="ghost"
                iconName="X"
                iconSize={20}
                onClick={handleStopAR}
                className="text-white hover:bg-white/20"
              />
            </div>
          </div>
          {/* AR Information Panel */}
          <div className="p-4 bg-black/90 text-white">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">AR Mode: {currentEnvironment?.name}</h4>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs">Recording</span>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-3">
              Tap on career objects to learn more. Move around to discover different roles.
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                iconPosition="left"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Reset View
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                className="border-white/20 text-white hover:bg-white/10"
              >
                AR Settings
              </Button>
            </div>
          </div>
        </div>)
      )}
      {/* Feature Info */}
      <div className="p-4 border-t border-border/40 bg-muted/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium mb-1">About AR Career Explorer</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Experience different work environments in augmented reality. Interact with 3D career objects, 
              watch day-in-the-life simulations, and get immersive insights into various professions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARCareerExplorer;