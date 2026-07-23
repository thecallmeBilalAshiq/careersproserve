// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: {
    min: number;
    max: number;
  };
  type: string;
  experience: string;
  category: string;
  description: string;
  requirements: string[];
  benefits: string[];
  featured: boolean;
  status: string;
  postedAt: Date;
  applicants: number;
}

// Training Types
export interface Training {
  id: string;
  title: string;
  category: string;
  level: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  description: string;
  curriculum: string[];
  duration: number; // in hours
  createdAt: Date;
}

// Application Types
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: string;
  appliedAt: Date;
  coverLetter?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  content: string;
  excerpt: string;
  image?: string;
  publishedAt: Date;
  readTime: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  count: number;
}

// Certificate Types
export interface Certificate {
  id: string;
  userId: string;
  trainingId: string;
  trainingTitle: string;
  issuedAt: Date;
  expiresAt?: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

// Search Params
export interface SearchParams {
  query?: string;
  category?: string;
  location?: string;
  salary?: string;
  experience?: string;
  type?: string;
  page?: number;
}
