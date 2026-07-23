# Sapphire Career Hub - Full-Stack Setup Guide

## Overview
Sapphire Career Hub is a premium 3D SaaS platform for jobs and training with a powerful admin dashboard. The project includes:
- **Frontend**: Next.js 16 with 3D animations (Three.js, React Three Fiber)
- **Backend**: Supabase with PostgreSQL, real-time subscriptions, and Row Level Security
- **Architecture**: Integrated frontend + backend with API routes and real database

## Technology Stack

### Frontend
- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Three.js + React Three Fiber** for 3D animations
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **Supabase JS Client** for database queries

### Backend
- **Supabase PostgreSQL** - Real database
- **Row Level Security (RLS)** - Data protection
- **JWT Authentication** - Secure sessions
- **Real-time Subscriptions** - Live updates
- **Database Triggers** - Auto-profile creation

### 3D & Visual
- **Three.js** - 3D graphics engine
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful Three.js helpers
- **Custom Shaders** - Tech-inspired colors (Cyan, Violet, Green)

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── admin/
│   │   ├── page.tsx           # Admin dashboard (3D stats)
│   │   ├── login/page.tsx      # Admin login
│   │   ├── jobs/page.tsx       # Jobs management
│   │   └── ...
│   ├── api/
│   │   ├── jobs/route.ts       # Jobs API
│   │   ├── training/route.ts   # Training API
│   │   └── auth/callback/route.ts
│   ├── sapphire/page.tsx       # Sapphire portfolio
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home (3D background)
│
├── components/
│   ├── 3d/
│   │   ├── AnimatedBackground.tsx    # 3D hero background
│   │   ├── FloatingOrbs.tsx          # Animated particles
│   │   ├── StatsVisualization.tsx    # 3D bar charts
│   │   └── BarChart3D.tsx            # 3D visualization
│   ├── layout/
│   │   ├── Navbar.tsx          # Top navigation
│   │   └── Footer.tsx          # Footer
│   └── common/
│       ├── JobCard.tsx
│       ├── TrainingCard.tsx
│       └── ...
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client
│   ├── types.ts                # TypeScript types
│   ├── constants.ts            # App constants
│   ├── seed-admin.ts           # Admin seeding script
│   └── utils.ts
│
├── public/
│   ├── sapphire-profile.png    # Professional image
│   └── ...
│
└── SETUP.md                    # This file
```

## Supabase Database Schema

### Tables

1. **categories**
   - id, name, description, icon, timestamps

2. **jobs**
   - id, title, description, company, category_id, salary_min/max
   - location, job_type, experience_level, status, created_by, timestamps

3. **training**
   - id, title, description, category_id, level, instructor
   - duration_hours, price, created_by, timestamps

4. **profiles**
   - id (FK to auth.users), full_name, avatar_url, bio, phone, location
   - is_admin, timestamps

5. **applications**
   - id, job_id, user_id, status, cover_letter, resume_url, timestamps

6. **enrollments**
   - id, training_id, user_id, progress_percentage, completed, timestamps

7. **admin_users**
   - id (FK to auth.users), email, role, permissions[], timestamps

### RLS Policies
- ✅ Public read access for jobs, training, categories
- ✅ Admin-only write access
- ✅ User-owned data protection
- ✅ Secure admin credentials

## Admin Credentials

**Default Admin Account:**
- Email: `admin@sapphire.career`
- Password: `SapphireAdmin@2024!`
- Role: Super Administrator
- Permissions: Full System Access

**Access Points:**
1. Admin Login: `/admin/login`
2. Admin Dashboard: `/admin`
3. Jobs Management: `/admin/jobs`
4. Training Management: `/admin/training`
5. Users Management: `/admin/users`
6. Applications: `/admin/applications`

## 3D Features & Colors

### Tech Color Palette
- **Cyan**: `#00D9FF` - Primary accent
- **Violet**: `#7C3AED` - Secondary accent
- **Green**: `#00FF88` - Success/growth
- **Pink**: `#FF006E` - Highlights
- **White/Gray**: Neutrals

### 3D Components
1. **Animated Background** (Home page)
   - Floating wireframe orbs
   - Interactive particles
   - Tech-inspired lighting
   - Smooth continuous animation

2. **3D Bar Chart** (Admin dashboard)
   - Real-time data visualization
   - Rotating chart
   - Glowing bars with emissive materials
   - Smooth color transitions

3. **Particle System**
   - Wireframe geometry
   - Boundary physics
   - Velocity-based movement
   - Color shifting

## API Endpoints

### Jobs
```
GET  /api/jobs              # Get all open jobs
POST /api/jobs              # Create new job (admin only)
GET  /api/jobs/[id]         # Get single job
PUT  /api/jobs/[id]         # Update job (admin only)
DEL  /api/jobs/[id]         # Delete job (admin only)
```

### Training
```
GET  /api/training          # Get all training programs
POST /api/training          # Create training (admin only)
GET  /api/training/[id]     # Get single program
PUT  /api/training/[id]     # Update program (admin only)
DEL  /api/training/[id]     # Delete program (admin only)
```

### Authentication
```
POST /api/auth/signup       # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/callback     # OAuth callback
```

## Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional - for email redirects
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Setup Instructions

### 1. Clone & Install
```bash
cd /vercel/share/v0-project
pnpm install
```

### 2. Database Setup
- Supabase schema is already created in the database
- Run migrations if needed: see `SETUP.md` for SQL scripts

### 3. Seed Admin User
```bash
# Using the seed script
pnpm ts-node lib/seed-admin.ts
```

Or manually via Supabase dashboard:
1. Create user: `admin@sapphire.career` / `SapphireAdmin@2024!`
2. Add to `admin_users` table with role `admin`

### 4. Run Development Server
```bash
pnpm dev
```

Visit:
- Home: http://localhost:3000
- Admin Login: http://localhost:3000/admin/login
- Sapphire Portfolio: http://localhost:3000/sapphire

### 5. Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Full-stack 3D Sapphire Career Hub"
git push origin main

# Deploy via Vercel
vercel deploy
```

## Authentication Flow

1. **User Signs Up**
   ```
   /register → Supabase Auth → Profile auto-created → /dashboard
   ```

2. **Admin Logs In**
   ```
   /admin/login → Check admin_users table → /admin (if authorized)
   ```

3. **Protected Routes**
   ```
   Middleware checks auth session → Verify user role → Allow/Redirect
   ```

## RLS Security

All data is protected by Row Level Security:

```sql
-- Example: Users can only see their own applications
CREATE POLICY "applications_select_own_or_admin" ON applications
FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
```

## Performance Tips

1. **3D Optimization**
   - Limit particle count (currently 5 orbs)
   - Use `Suspense` for 3D components
   - Consider disabling on mobile

2. **Database Queries**
   - Use RLS for automatic filtering
   - Index frequently queried fields
   - Paginate large result sets

3. **Caching**
   - Next.js caches page components
   - Use SWR for client-side data
   - Supabase real-time for live updates

## Troubleshooting

### Admin Login Not Working
1. Check Supabase project is connected
2. Verify admin user exists in `admin_users` table
3. Check email confirmation in auth.users

### 3D Not Rendering
1. Check console for WebGL errors
2. Verify Three.js is installed
3. Ensure Suspense boundary is present

### RLS Blocking Queries
1. Check user is authenticated
2. Verify RLS policies exist
3. Check user role/permissions

## Next Steps

1. **Backend API**
   - Create separate Node.js/Express backend
   - Connect via fetch to `/api` routes
   - Use same Supabase database

2. **Enhanced Admin**
   - Add more management pages
   - Real-time analytics
   - User activity logs

3. **Mobile App**
   - React Native version
   - Same Supabase backend
   - Native 3D using Babylon Native

4. **Analytics**
   - Track user engagement
   - Job application metrics
   - Training completion rates

## Support

For issues, refer to:
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Three.js Docs](https://threejs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)

---

**Last Updated:** 2024
**Version:** 1.0.0
**Built with:** Next.js 16, Supabase, Three.js
