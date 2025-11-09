import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AIFloatingAssistant from '../../components/ui/AIFloatingAssistant';
import CollegeHeader from './components/CollegeHeader';
import ProgramsTab from './components/ProgramsTab';
import AdmissionTab from './components/AdmissionTab';
import FacilitiesTab from './components/FacilitiesTab';
import ReviewsTab from './components/ReviewsTab';
import LocationMap from './components/LocationMap';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CollegeDetails = () => {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('programs');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock college data
  const mockCollegeData = {
    id: 'college-1',
    name: 'Government Medical College Srinagar',
    location: 'Srinagar, Jammu & Kashmir',
    establishedYear: 1959,
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    description: `Government Medical College Srinagar is one of the premier medical institutions in Jammu & Kashmir, established in 1959. The college is affiliated with the University of Kashmir and is recognized by the Medical Council of India (MCI). It offers undergraduate and postgraduate courses in various medical disciplines with state-of-the-art facilities and experienced faculty.`,
    fullAddress: 'Karan Nagar, Srinagar, Jammu & Kashmir 190010, India',
    phone: '+91-194-2401013',
    email: 'principal@gmcsrinagar.edu.in',
    website: 'https://www.gmcsrinagar.edu.in',
    totalStudents: 1200,
    facultyCount: 180,
    coursesOffered: 15,
    placementRate: 95,
    ranking: 45,
    accreditations: ['MCI Approved', 'NAAC A+ Grade', 'ISO 9001:2015'],
    coordinates: {
      lat: 34.0837,
      lng: 74.7973
    },
    nearbyAmenities: [
      { name: 'SMHS Hospital', icon: 'Hospital', distance: '0.5 km' },
      { name: 'Dal Lake', icon: 'Waves', distance: '2.1 km' },
      { name: 'Srinagar Airport', icon: 'Plane', distance: '12 km' },
      { name: 'Railway Station', icon: 'Train', distance: '8 km' }
    ],
    transportation: [
      { type: 'Bus Stop', icon: 'Bus', description: 'Regular city bus service', distance: '200m' },
      { type: 'Auto Stand', icon: 'Car', description: 'Auto rickshaw available', distance: '100m' },
      { type: 'Taxi Service', icon: 'Car', description: '24/7 taxi service', distance: 'On-call' }
    ]
  };

  const mockPrograms = [
    {
      id: 'mbbs',
      name: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
      level: 'undergraduate',
      category: 'medical',
      duration: '5.5 years',
      annualFee: 25000,
      totalSeats: 100,
      availability: 'available',
      description: 'Comprehensive medical degree program covering all aspects of medicine and surgery with clinical training.',
      eligibility: [
        'Class 12 with Physics, Chemistry, Biology',
        'Minimum 50% marks in PCB',
        'NEET qualification mandatory',
        'Age limit: 17-25 years'
      ],
      specializations: ['General Medicine', 'Surgery', 'Pediatrics', 'Gynecology', 'Orthopedics']
    },
    {
      id: 'md-medicine',
      name: 'Doctor of Medicine (MD) - General Medicine',
      level: 'postgraduate',
      category: 'medical',
      duration: '3 years',
      annualFee: 35000,
      totalSeats: 15,
      availability: 'limited',
      description: 'Postgraduate specialization in internal medicine with advanced clinical training.',
      eligibility: [
        'MBBS degree from recognized university',
        'Completion of internship',
        'NEET PG qualification',
        'Valid medical registration'
      ],
      specializations: ['Cardiology', 'Gastroenterology', 'Nephrology', 'Endocrinology']
    },
    {
      id: 'ms-surgery',
      name: 'Master of Surgery (MS) - General Surgery',
      level: 'postgraduate',
      category: 'medical',
      duration: '3 years',
      annualFee: 35000,
      totalSeats: 12,
      availability: 'available',
      description: 'Advanced surgical training program with hands-on experience in various surgical procedures.',
      eligibility: [
        'MBBS degree from recognized university',
        'Completion of internship',
        'NEET PG qualification',
        'Valid medical registration'
      ],
      specializations: ['Cardiac Surgery', 'Neurosurgery', 'Plastic Surgery', 'Orthopedic Surgery']
    }
  ];

  const mockAdmissionInfo = {
    timeline: [
      {
        title: 'Application Opens',
        description: 'Online application portal opens for all courses',
        startDate: '2024-03-01',
        endDate: '2024-03-31',
        status: 'completed',
        completed: true,
        current: false
      },
      {
        title: 'Document Verification',
        description: 'Upload and verify all required documents',
        startDate: '2024-04-01',
        endDate: '2024-04-15',
        status: 'open',
        completed: false,
        current: true
      },
      {
        title: 'Entrance Exam',
        description: 'NEET/NEET PG examination',
        startDate: '2024-05-01',
        endDate: '2024-05-05',
        status: 'upcoming',
        completed: false,
        current: false
      },
      {
        title: 'Counseling Process',
        description: 'Merit-based counseling and seat allocation',
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        status: 'upcoming',
        completed: false,
        current: false
      }
    ],
    selectionProcess: [
      {
        title: 'Entrance Exam',
        icon: 'FileText',
        description: 'NEET/NEET PG score is the primary selection criteria',
        weightage: 70
      },
      {
        title: 'Academic Record',
        icon: 'BookOpen',
        description: 'Class 12 or graduation marks consideration',
        weightage: 20
      },
      {
        title: 'State Quota',
        icon: 'MapPin',
        description: 'Domicile certificate for state quota seats',
        weightage: 10
      }
    ],
    requiredDocuments: [
      {
        name: 'Class 10 Certificate',
        description: 'Original and photocopy required',
        required: true
      },
      {
        name: 'Class 12 Certificate',
        description: 'Original marksheet and passing certificate',
        required: true
      },
      {
        name: 'NEET Scorecard',
        description: 'Valid NEET qualification certificate',
        required: true
      },
      {
        name: 'Domicile Certificate',
        description: 'For state quota consideration',
        required: false
      },
      {
        name: 'Category Certificate',
        description: 'SC/ST/OBC certificate if applicable',
        required: false
      },
      {
        name: 'Passport Size Photos',
        description: '6 recent passport size photographs',
        required: true
      }
    ],
    applicationFees: [
      {
        category: 'General/OBC',
        amount: 1500,
        description: 'Application processing fee'
      },
      {
        category: 'SC/ST',
        amount: 750,
        description: 'Subsidized fee for reserved categories'
      },
      {
        category: 'NRI/Foreign',
        amount: 5000,
        description: 'International applicant fee'
      }
    ],
    importantNotes: [
      'All documents must be attested by a Gazetted Officer',
      'Application fee is non-refundable under any circumstances',
      'Late applications will not be accepted after the deadline',
      'Candidates must report for counseling on the specified date',
      'Seat will be cancelled if fee is not paid within 7 days of allocation'
    ]
  };

  const mockFacilities = [
    {
      id: 'library',
      name: 'Central Library',
      category: 'academic',
      icon: 'BookOpen',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      description: 'Modern library with over 50,000 medical books, journals, and digital resources.',
      features: ['Digital Catalog', 'E-Books', 'Research Databases', 'Study Rooms', '24/7 Access'],
      capacity: '500 students',
      timing: '6:00 AM - 11:00 PM',
      status: 'excellent',
      rating: 4.5,
      reviewCount: 234
    },
    {
      id: 'hospital',
      name: 'Teaching Hospital',
      category: 'medical',
      icon: 'Hospital',
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop',
      description: '800-bed multi-specialty teaching hospital with advanced medical equipment.',
      features: ['ICU', 'Emergency Ward', 'OT Complex', 'Diagnostic Center', 'Blood Bank'],
      capacity: '800 beds',
      timing: '24/7 Service',
      status: 'excellent',
      rating: 4.7,
      reviewCount: 456
    },
    {
      id: 'labs',
      name: 'Research Laboratories',
      category: 'academic',
      icon: 'Microscope',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
      description: 'State-of-the-art research labs for anatomy, physiology, pathology, and microbiology.',
      features: ['Advanced Equipment', 'Research Facilities', 'Digital Microscopy', 'Specimen Collection'],
      capacity: '200 students',
      timing: '8:00 AM - 6:00 PM',
      status: 'excellent',
      rating: 4.6,
      reviewCount: 189
    },
    {
      id: 'hostel',
      name: 'Student Hostels',
      category: 'accommodation',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop',
      description: 'Separate hostels for boys and girls with modern amenities and security.',
      features: ['Wi-Fi', 'Mess Facility', 'Recreation Room', 'Laundry', '24/7 Security'],
      capacity: '800 students',
      timing: 'Residential',
      status: 'good',
      rating: 4.2,
      reviewCount: 312
    },
    {
      id: 'cafeteria',
      name: 'Student Cafeteria',
      category: 'dining',
      icon: 'Coffee',
      image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop',
      description: 'Spacious cafeteria serving nutritious meals and snacks throughout the day.',
      features: ['Vegetarian Options', 'Non-Veg Counter', 'Beverages', 'Hygienic Preparation'],
      capacity: '300 students',
      timing: '7:00 AM - 9:00 PM',
      status: 'good',
      rating: 4.0,
      reviewCount: 278
    },
    {
      id: 'sports',
      name: 'Sports Complex',
      category: 'sports',
      icon: 'Trophy',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'Multi-purpose sports complex with indoor and outdoor facilities.',
      features: ['Basketball Court', 'Badminton Hall', 'Gym', 'Cricket Ground', 'Table Tennis'],
      capacity: '200 students',
      timing: '6:00 AM - 8:00 PM',
      status: 'good',
      rating: 4.3,
      reviewCount: 156
    }
  ];

  const mockReviews = [
    {
      id: 1,
      author: 'Dr. Priya Sharma',
      course: 'MBBS 2019-2024',
      rating: 5,
      date: '2024-08-15',
      verified: true,
      content: `Excellent medical college with outstanding faculty and infrastructure. The clinical exposure at SMHS Hospital is invaluable for practical learning. The college has a rich history and maintains high academic standards.`,
      pros: [
        'Experienced and dedicated faculty',
        'Excellent clinical exposure',
        'Good infrastructure and facilities',
        'Strong alumni network'
      ],
      cons: [
        'Limited parking space',
        'Hostel food could be better'
      ],
      helpfulCount: 23
    },
    {
      id: 2,
      author: 'Rahul Kumar',
      course: 'MD Medicine 2021-2024',
      rating: 4,
      date: '2024-07-22',
      verified: true,
      content: `Great place for postgraduate medical education. The research opportunities are good and the faculty is supportive. The hospital provides diverse case exposure which is essential for specialization.`,
      pros: [
        'Good research opportunities',
        'Diverse patient cases',
        'Supportive faculty',
        'Well-equipped labs'
      ],
      cons: [
        'Heavy workload',
        'Limited recreational facilities'
      ],
      helpfulCount: 18
    },
    {
      id: 3,
      author: 'Anjali Devi',
      course: 'MBBS 2020-2025',
      rating: 4,
      date: '2024-06-10',
      verified: true,
      content: `The college provides a good learning environment with modern facilities. The library is well-stocked and the digital resources are helpful. The clinical postings are well-organized.`,
      pros: [
        'Modern library facilities',
        'Well-organized clinical postings',
        'Good digital resources',
        'Peaceful campus environment'
      ],
      cons: [
        'Internet connectivity issues sometimes',
        'Limited extracurricular activities'
      ],
      helpfulCount: 15
    }
  ];

  const mockOverallRating = {
    average: 4.4,
    categories: [
      { name: 'Academics', rating: 4.6 },
      { name: 'Faculty', rating: 4.5 },
      { name: 'Infrastructure', rating: 4.2 },
      { name: 'Placements', rating: 4.3 }
    ]
  };

  const tabs = [
    { id: 'programs', label: 'Programs', icon: 'GraduationCap' },
    { id: 'admission', label: 'Admission', icon: 'FileText' },
    { id: 'facilities', label: 'Facilities', icon: 'Building' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'location', label: 'Location', icon: 'MapPin' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setCollege(mockCollegeData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [collegeId]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: college?.name,
        text: `Check out ${college?.name} - ${college?.description?.substring(0, 100)}...`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      // You could show a toast notification here
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'programs':
        return <ProgramsTab programs={mockPrograms} />;
      case 'admission':
        return <AdmissionTab admissionInfo={mockAdmissionInfo} />;
      case 'facilities':
        return <FacilitiesTab facilities={mockFacilities} />;
      case 'reviews':
        return <ReviewsTab reviews={mockReviews} overallRating={mockOverallRating} />;
      case 'location':
        return <LocationMap college={college} />;
      default:
        return <ProgramsTab programs={mockPrograms} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading college details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h2 className="text-xl font-semibold text-foreground">College Not Found</h2>
            <p className="text-muted-foreground">The college you're looking for doesn't exist.</p>
            <Button
              variant="default"
              onClick={() => navigate('/career-exploration')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Exploration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{college?.name} - College Details | EduPath Advisor</title>
        <meta name="description" content={college?.description} />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <button
            onClick={() => navigate('/career-exploration')}
            className="hover:text-foreground transition-colors"
          >
            Career Exploration
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">{college?.name}</span>
        </nav>

        {/* College Header */}
        <CollegeHeader
          college={college}
          onBookmark={handleBookmark}
          onShare={handleShare}
          isBookmarked={isBookmarked}
        />

        {/* Tab Navigation */}
        <div className="glass-card rounded-xl border border-border/40 overflow-hidden">
          <div className="border-b border-border/40">
            <nav className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl border border-border/40 p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready to Apply?
              </h3>
              <p className="text-muted-foreground">
                Don't miss the application deadline. Start your journey today!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="default"
                iconName="ExternalLink"
                iconPosition="left"
              >
                Apply Now
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Download Brochure
              </Button>
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
              >
                Contact College
              </Button>
            </div>
          </div>
        </div>
      </main>
      <AIFloatingAssistant />
    </div>
  );
};

export default CollegeDetails;