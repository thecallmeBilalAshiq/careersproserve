// Navigation
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Trainings', href: '/training' },
  { label: 'Hire Proctors', href: '/proctors/submit-job' },
  { label: 'Mystery Shopper', href: '/mystery-shopper' },
  { label: 'Talent Pool', href: '/talent-pool' },
  { label: 'About Us', href: '/about' },
];

export const COMPANY_DETAILS = {
  name: 'Careers Pro Serve',
  email: 'careersproserve@gmail.com',
  phone: '+923216714725',
  whatsapp: '923216714725',
  bankName: 'Meezan Bank',
  accountTitle: 'Careers Pro Serve',
  accountNumber: 'PK92MEZN00010982347101',
};

export const DASHBOARD_NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutGrid' },
  { label: 'Explore Jobs', href: '/jobs', icon: 'Briefcase' },
  { label: 'Saved Jobs', href: '/saved-jobs', icon: 'Bookmark' },
  { label: 'Applied Jobs', href: '/applied-jobs', icon: 'FileText' },
  { label: 'Training Programs', href: '/training', icon: 'BookOpen' },
  { label: 'Certificates', href: '/certificates', icon: 'Award' },
  { label: 'Profile', href: '/profile', icon: 'User' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
];

// Job Categories
export const JOB_CATEGORIES = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'Finance',
  'HR',
  'Operations',
];

// Salary Ranges
export const SALARY_RANGES = [
  { label: '$0 - $50k', min: 0, max: 50000 },
  { label: '$50k - $100k', min: 50000, max: 100000 },
  { label: '$100k - $150k', min: 100000, max: 150000 },
  { label: '$150k - $200k', min: 150000, max: 200000 },
  { label: '$200k+', min: 200000, max: Infinity },
];

// Experience Levels
export const EXPERIENCE_LEVELS = [
  'Entry Level',
  'Junior',
  'Mid-Level',
  'Senior',
  'Lead',
  'Executive',
];

// Job Types
export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

// Training Levels
export const TRAINING_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

// Status Badges
export const JOB_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  FEATURED: 'featured',
};

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

// Pagination
export const PAGE_SIZE = 10;
