# Sapphire Career Hub - Complete Project Structure

## 📂 Folder Organization

```
sapphire-career-hub/
│
├── frontend/                          # Next.js 16 Frontend Application
│   ├── app/
│   │   ├── page.tsx                  # Home page with 3D animations
│   │   ├── admin/
│   │   │   ├── page.tsx              # Admin dashboard
│   │   │   ├── login/                # Admin login page
│   │   │   ├── jobs/                 # Jobs management
│   │   │   ├── training/             # Training management
│   │   │   ├── users/                # Users management
│   │   │   ├── applications/         # Applications management
│   │   │   ├── categories/           # Categories management
│   │   │   └── messages/             # Messages management
│   │   ├── jobs/                     # Public jobs pages
│   │   ├── training/                 # Public training pages
│   │   ├── sapphire/                 # Executive portfolio
│   │   ├── auth/                     # Auth pages (login, register)
│   │   ├── about/                    # About page
│   │   ├── blog/                     # Blog section
│   │   ├── contact/                  # Contact page
│   │   ├── faq/                      # FAQ page
│   │   ├── privacy/                  # Privacy policy
│   │   ├── terms/                    # Terms of service
│   │   ├── api/                      # API routes (optional, uses backend)
│   │   ├── layout.tsx                # Root layout
│   │   ├── providers.tsx             # App providers
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── AnimatedBackground.tsx    # 3D background
│   │   │   ├── FloatingOrbs.tsx          # Floating orbs animation
│   │   │   ├── StatsVisualization.tsx    # 3D stats
│   │   │   └── BarChart3D.tsx            # 3D bar chart
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                # Navigation bar
│   │   │   └── Footer.tsx                # Footer
│   │   └── common/
│   │       ├── JobCard.tsx               # Job card component
│   │       ├── TrainingCard.tsx          # Training card
│   │       ├── StatCard.tsx              # Stat card
│   │       └── EmptyState.tsx            # Empty state
│   │
│   ├── hooks/
│   │   ├── useAuth.tsx                   # Authentication hook
│   │   └── useLocalStorage.ts            # LocalStorage hook
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                 # Supabase client
│   │   │   └── server.ts                 # Supabase server
│   │   ├── types.ts                      # TypeScript types
│   │   ├── constants.ts                  # App constants
│   │   ├── mockData.ts                   # Mock data
│   │   └── utils.ts                      # Utility functions
│   │
│   ├── public/
│   │   ├── sapphire-profile.png          # Sapphire's profile photo
│   │   └── other-assets/                 # Static assets
│   │
│   ├── package.json                      # Frontend dependencies
│   ├── tsconfig.json                     # TypeScript config
│   ├── next.config.mjs                   # Next.js config
│   ├── postcss.config.mjs                # PostCSS config
│   ├── .env.example                      # Environment template
│   ├── .env.local                        # Local environment (not in git)
│   ├── README.md                         # Frontend documentation
│   └── globals.css                       # Global styles
│
├── backend/                              # Express.js Backend API
│   ├── src/
│   │   ├── index.ts                      # Main server file
│   │   └── routes/
│   │       ├── jobs.ts                   # Jobs endpoints
│   │       ├── training.ts               # Training endpoints
│   │       ├── users.ts                  # Users endpoints
│   │       ├── applications.ts           # Applications endpoints
│   │       └── auth.ts                   # Auth endpoints
│   │
│   ├── package.json                      # Backend dependencies
│   ├── tsconfig.json                     # TypeScript config
│   ├── .env.example                      # Environment template
│   ├── .env                              # Production env (not in git)
│   ├── README.md                         # Backend documentation
│   └── dist/                             # Compiled JavaScript (build output)
│
├── README.md                             # Main project documentation
├── DEPLOYMENT.md                         # Deployment guide
├── PROJECT_STRUCTURE.md                  # This file
├── QUICK_START.md                        # Quick start guide (legacy)
├── SETUP.md                              # Setup guide (legacy)
├── ADMIN_GUIDE.md                        # Admin documentation (legacy)
└── .gitignore                            # Git ignore rules
```

## 📋 Key Files Explained

### Frontend Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page with 3D animated background |
| `app/admin/page.tsx` | Main admin dashboard |
| `components/3d/AnimatedBackground.tsx` | 3D background with Three.js |
| `hooks/useAuth.tsx` | Authentication context and hooks |
| `lib/supabase/client.ts` | Supabase client initialization |
| `package.json` | Frontend dependencies & scripts |

### Backend Key Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Express server setup and middleware |
| `src/routes/jobs.ts` | Jobs CRUD endpoints |
| `src/routes/auth.ts` | Authentication endpoints |
| `package.json` | Backend dependencies & scripts |

### Root Level Documentation

| File | Purpose |
|------|---------|
| `README.md` | Complete project overview |
| `DEPLOYMENT.md` | Production deployment guide |
| `PROJECT_STRUCTURE.md` | This file - folder organization |

## 🚀 Running the Project

### Quick Start

**Backend (Terminal 1):**
```bash
cd backend
pnpm install
cp .env.example .env
# Edit .env with your Supabase credentials
pnpm dev
# Server runs on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd frontend
pnpm install
cp .env.example .env.local
# Edit .env.local with Supabase and API config
pnpm dev
# App runs on http://localhost:3000
```

### Access Points

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Frontend home page |
| `http://localhost:3000/admin/login` | Admin login |
| `http://localhost:3000/admin` | Admin dashboard |
| `http://localhost:3000/sapphire` | Executive portfolio |
| `http://localhost:5000/api/health` | Backend health check |
| `http://localhost:5000/api/jobs` | Jobs API |

### Admin Credentials

```
Email: admin@sapphire.career
Password: SapphireAdmin@2024!
```

## 🔌 API Integration

### Frontend → Backend Communication

Frontend calls backend API at configured `NEXT_PUBLIC_API_BASE_URL`:

**Development:**
```
http://localhost:5000/api
```

**Production:**
```
https://your-backend-url.railway.app/api
```

### Example API Call

```typescript
// Frontend code
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`
);
const { data } = await response.json();
```

## 📊 Database Schema

### Tables (Supabase PostgreSQL)

1. **categories** - Job/Training categories
2. **jobs** - Job listings
3. **training** - Training programs
4. **profiles** - User profiles
5. **applications** - Job applications
6. **enrollments** - Training enrollments
7. **admin_users** - Admin accounts

All tables have Row Level Security (RLS) enabled.

## 🔐 Security Setup

### Row Level Security (RLS)
- Categories: Public read
- Jobs: Public read, admin write
- Training: Public read, admin write
- Profiles: User read/write own profile
- Applications: User read own, admin read all
- Enrollments: User read own, admin read all
- Admin Users: Admin only

### Environment Variables
- Stored in `.env` (not in git)
- Different for local/production
- Sensitive keys never exposed in code

## 📦 Dependencies

### Frontend
- **React:** UI framework
- **Next.js:** Full-stack framework
- **Three.js:** 3D graphics
- **Framer Motion:** Animations
- **Tailwind CSS:** Styling
- **Supabase:** Database client
- **Zod:** Validation

### Backend
- **Express:** Web framework
- **Supabase:** Database & Auth
- **TypeScript:** Type safety
- **CORS:** Cross-origin requests

## 🎯 Development Workflow

### Adding a New Feature

1. **Plan in Frontend:**
   - Create page in `app/`
   - Add components in `components/`
   - Add API calls to utilities

2. **Add Backend Support:**
   - Add route in `backend/src/routes/`
   - Add database operations
   - Add error handling

3. **Connect Database:**
   - Use Supabase client
   - Add RLS policies if needed
   - Test with mock data

4. **Test Locally:**
   - Run both servers
   - Test all user flows
   - Check console for errors

5. **Deploy:**
   - Push to GitHub
   - Vercel auto-deploys frontend
   - Railway auto-deploys backend

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) - Landing with 3D background
- **Jobs** (`/jobs`) - Job listings
- **Training** (`/training`) - Training programs
- **Sapphire** (`/sapphire`) - Executive portfolio
- **About** (`/about`) - Company info
- **Blog** (`/blog`) - Blog posts
- **Contact** (`/contact`) - Contact form
- **FAQ** (`/faq`) - FAQ section
- **Privacy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms of service

### Admin Pages
- **Admin Login** (`/admin/login`) - Admin authentication
- **Dashboard** (`/admin`) - Main admin hub
- **Jobs** (`/admin/jobs`) - Manage jobs
- **Training** (`/admin/training`) - Manage training
- **Users** (`/admin/users`) - Manage users
- **Applications** (`/admin/applications`) - Review applications
- **Categories** (`/admin/categories`) - Manage categories
- **Messages** (`/admin/messages`) - Contact submissions

### User Pages
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration
- **Dashboard** (`/dashboard`) - User dashboard

## 🌐 Environment Files

### Frontend (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_BASE_URL
```

### Backend (.env)
```
PORT
NODE_ENV
SUPABASE_URL
SUPABASE_SERVICE_KEY
CORS_ORIGIN
ADMIN_EMAIL
ADMIN_PASSWORD
```

## 📚 Documentation Files

| File | Content |
|------|---------|
| `README.md` | Full project overview |
| `DEPLOYMENT.md` | Production deployment instructions |
| `PROJECT_STRUCTURE.md` | This file |
| `frontend/README.md` | Frontend specific docs |
| `backend/README.md` | Backend API documentation |

## ✅ Checklist for New Developers

- [ ] Read main `README.md`
- [ ] Setup Supabase project
- [ ] Copy `.env.example` to `.env` (both folders)
- [ ] Run `pnpm install` in both folders
- [ ] Start backend: `cd backend && pnpm dev`
- [ ] Start frontend: `cd frontend && pnpm dev`
- [ ] Visit `http://localhost:3000`
- [ ] Test admin login at `/admin/login`
- [ ] Check API at `http://localhost:5000/api/health`

## 🎓 Learning Resources

### Frontend
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Three.js: https://threejs.org/docs
- Tailwind: https://tailwindcss.com/docs

### Backend
- Express: https://expressjs.com
- Supabase: https://supabase.com/docs
- TypeScript: https://www.typescriptlang.org/docs

## 🚀 Ready to Deploy?

See `DEPLOYMENT.md` for complete production deployment guide including:
- Vercel frontend deployment
- Railway backend deployment
- Supabase database configuration
- Environment variable setup
- Monitoring and scaling

## 📞 Need Help?

1. Check relevant README files
2. Review DEPLOYMENT.md for deployment issues
3. Check frontend/backend logs
4. Review Supabase dashboard
5. Check console for errors

---

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** Production Ready
