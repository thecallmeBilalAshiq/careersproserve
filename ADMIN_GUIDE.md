# Admin Dashboard Guide - Sapphire Career Hub

## Overview

The Sapphire Career Hub Admin Dashboard is a professional, production-ready management interface built with:
- **React 19** + **Next.js 16** for fast, modern UI
- **Supabase PostgreSQL** for secure data storage
- **Framer Motion** for smooth animations
- **Tailwind CSS** for beautiful responsive design
- **Row Level Security** for data protection

## Admin Access

### Credentials
```
Email: admin@sapphire.career
Password: SapphireAdmin@2024!
```

### Login URL
```
http://localhost:3000/admin/login
```

### Dashboard URL (after login)
```
http://localhost:3000/admin
```

## Dashboard Layout

### Left Sidebar Navigation
The admin dashboard features a collapsible sidebar with the following sections:

1. **Dashboard** - Overview with key metrics and management cards
2. **Jobs** - Create, edit, and delete job listings
3. **Training** - Manage training programs and courses
4. **Users** - View and manage user profiles
5. **Applications** - Review job applications
6. **Messages** - Handle contact form submissions
7. **Settings** - Configure admin settings
8. **Logout** - Sign out from admin panel

### Sidebar Features
- **Collapsible Design**: Click the menu icon to expand/collapse
- **Active State Indicators**: Current page is highlighted in blue
- **Smooth Animations**: Slide and hover transitions
- **Logo Section**: Sapphire branding at the top
- **Admin Badge**: Shows admin status

## Dashboard Sections

### 1. Main Dashboard (`/admin`)
**Features:**
- Welcome message with admin username
- Quick stats overview (Total Users, Active Jobs, Applications, Training)
- 6 Management Cards:
  - **Jobs**: 87 active job listings
  - **Training**: 45 training courses
  - **Users**: 1,243 registered users
  - **Applications**: 892 job applications
  - **Messages**: 24 contact inquiries
  - **Categories**: 12 job/training categories

**Quick Stats Section:**
- Shows percentage changes (e.g., "+12% this month")
- Displays key metrics at a glance

### 2. Jobs Management (`/admin/jobs`)
**Features:**
- View all job listings
- Search functionality
- Add new jobs (button in header)
- Edit existing jobs
- Delete jobs
- Filter by job status (open, closed, on_hold)

**Available Actions:**
- Create new job posting
- Edit job details
- View applications for specific job
- Delete job listings
- Update job status

### 3. Training Management (`/admin/training`)
**Features:**
- Manage training programs
- View course details
- Search training courses
- Add new training program
- Edit course information
- Delete courses

**Course Information:**
- Level: Beginner, Intermediate, Advanced
- Instructor name
- Duration in hours
- Price per course
- Description

### 4. Users Management (`/admin/users`)
**Features:**
- View all registered users
- Search users by name or email
- User profile information:
  - Full name
  - Email address
  - Phone number
  - Location
  - Join date

**Actions:**
- View user details
- Edit user profile
- Delete user account (with confirmation)

### 5. Applications Management (`/admin/applications`)
**Features:**
- Review job applications
- Status overview cards:
  - Pending: New applications
  - Reviewed: Reviewed but not decided
  - Shortlisted: Candidate shortlisted
  - Hired: Accepted offer
  - Rejected: Application rejected

**Application Details:**
- Applicant email
- Job title applied for
- Application status with color coding
- Date applied
- Cover letter preview
- Resume viewing

**Status Colors:**
- **Pending**: Gray
- **Reviewed**: Yellow
- **Shortlisted**: Blue
- **Hired**: Green
- **Rejected**: Red

### 6. Messages Management (`/admin/messages`)
**Features:**
- View contact form submissions
- Search messages
- Read message details
- Respond to inquiries
- Mark as resolved

**Message Information:**
- Sender name and email
- Subject line
- Message content
- Status (Unread, Read, Replied)
- Date received

### 7. Categories Management (`/admin/categories`)
**Features:**
- Manage job and training categories
- View all categories in grid layout
- Add new category
- Edit existing categories
- Delete categories
- Search categories

**Category Information:**
- Category name
- Description
- Icon/emoji
- Number of items in category

## Features & Capabilities

### Search Functionality
- **Global Search**: Available in all sections
- **Real-time Filtering**: Results update as you type
- **Multi-field Search**: Search across multiple fields

### Status Management
- **Visual Status Indicators**: Color-coded badges
- **Status Counts**: See totals for each status
- **Quick Filtering**: Filter by status

### Responsive Design
- **Desktop**: Full sidebar navigation with all details
- **Tablet**: Sidebar can be collapsed for more space
- **Mobile**: Responsive layout with touch-friendly buttons

### Animations
- **Smooth Transitions**: Page and element animations
- **Hover Effects**: Interactive feedback on buttons
- **Staggered Loading**: Smooth appearance of lists

## Data Management

### Create Operations
- Click "Add [Item]" button in section header
- Fill in required information
- Submit to save to Supabase

### Read Operations
- View all items in list/grid layout
- Search and filter to find specific items
- Click items to view full details

### Update Operations
- Click Edit icon on item card
- Modify information
- Save changes to Supabase

### Delete Operations
- Click Delete/Trash icon on item
- Confirm deletion
- Item removed from database

## Security Features

### Row Level Security (RLS)
- All data protected at the database level
- Only admins can modify listings
- Users can only see their own applications
- Complete data isolation

### Authentication
- Email/password authentication
- Secure session management
- Admin role verification on every page
- Automatic logout for security

### Data Protection
- Encrypted passwords
- Secure tokens
- HTTPS required in production
- Protected API endpoints

## Admin Permissions

**Admins can:**
- Create, edit, delete jobs
- Create, edit, delete training courses
- View all users
- Review and manage applications
- Respond to messages
- Manage categories
- Access all admin features

**Regular Users cannot:**
- Access admin dashboard
- Modify job listings
- Create training courses
- See other users' details
- Access admin settings

## API Integration

### Available Endpoints
- `GET /api/jobs` - Fetch all jobs
- `POST /api/jobs` - Create new job
- `GET /api/training` - Fetch all training
- `POST /api/training` - Create new training
- `GET /api/users` - Fetch users (admin only)
- `GET /api/applications` - Fetch applications (admin only)

### Database Tables
- `jobs` - Job listings
- `training` - Training programs
- `profiles` - User profiles
- `applications` - Job applications
- `enrollments` - Training enrollments
- `categories` - Job/Training categories
- `admin_users` - Admin accounts

## Troubleshooting

### Can't Login?
- Verify email: `admin@sapphire.career`
- Verify password: `SapphireAdmin@2024!`
- Check email confirmation (if required)
- Clear browser cache

### Page Not Loading?
- Check internet connection
- Refresh the page
- Clear browser cache
- Try a different browser

### Data Not Appearing?
- Verify Supabase connection
- Check Row Level Security policies
- Ensure user is logged in as admin
- Check database tables exist

### Search Not Working?
- Clear search field and try again
- Verify data exists in database
- Check spelling of search term
- Try different search fields

## Performance Tips

1. **Use Search**: Filter data to find items quickly
2. **Sidebar Toggle**: Collapse sidebar on small screens to see more content
3. **Batch Operations**: Consider bulk actions when managing many items
4. **Real-time Updates**: Dashboard shows live updates from database

## Next Steps

1. **First Login**: Use demo credentials to access dashboard
2. **Explore Sections**: Check out each management area
3. **Add Test Data**: Create sample jobs, training, users
4. **Set Up Categories**: Create category structure
5. **Configure Settings**: Customize admin panel as needed

## Support

For issues or questions:
1. Check this guide first
2. Review error messages in browser console
3. Check Supabase logs
4. Contact development team

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Platform**: Sapphire Career Hub
