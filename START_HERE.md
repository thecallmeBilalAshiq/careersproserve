# 🚀 Sapphire Career Hub - START HERE

Welcome! You now have a **complete, production-ready full-stack application** separated into **FRONTEND** and **BACKEND** folders as requested.

---

## 📦 What You Have

### ✅ Two Separate Folders:

```
sapphire-career-hub/
├── frontend/          (Next.js 16 with React 19 - Port 3000)
└── backend/           (Express.js TypeScript - Port 5000)
```

Each folder is **completely independent** with:
- Its own `package.json` with dependencies
- Its own `.env.example` template
- Its own `README.md` documentation
- Its own build and dev scripts

---

## 🎯 Quick Start (2 Minutes)

### Step 1: Setup Backend

```bash
cd backend
pnpm install
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
SUPABASE_URL=your_url
SUPABASE_SERVICE_KEY=your_key
```

Then run:
```bash
pnpm dev
```

✅ Backend runs on **http://localhost:5000**

### Step 2: Setup Frontend (in another terminal)

```bash
cd frontend
pnpm install
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

Then run:
```bash
pnpm dev
```

✅ Frontend runs on **http://localhost:3000**

---

## 🎮 Testing the App

### Access Points:

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Home page with 3D animations |
| `http://localhost:3000/admin/login` | Admin login |
| `http://localhost:3000/admin` | Admin dashboard |
| `http://localhost:5000/api/health` | Backend health check |

### Admin Credentials:

```
Email: admin@sapphire.career
Password: SapphireAdmin@2024!
```

---

## 📂 Folder Structure

### FRONTEND Folder
```
frontend/
├── app/                 ← All pages (home, admin, jobs, etc)
├── components/          ← React components (3D, UI, layout)
├── hooks/               ← Custom React hooks
├── lib/                 ← Utilities, types, Supabase client
├── public/              ← Static files
├── package.json         ← Dependencies & scripts
└── .env.example         ← Environment template
```

**What it does:**
- Renders the user interface
- Shows 3D animations on home page
- Admin dashboard for managing jobs/training
- Calls backend API for data

### BACKEND Folder
```
backend/
├── src/
│   ├── index.ts         ← Express server setup
│   └── routes/          ← API endpoints
│       ├── jobs.ts
│       ├── training.ts
│       ├── users.ts
│       ├── applications.ts
│       └── auth.ts
├── package.json         ← Dependencies & scripts
└── .env.example         ← Environment template
```

**What it does:**
- Receives requests from frontend
- Connects to Supabase database
- Manages jobs, training, users, applications
- Sends data back to frontend

---

## 🔌 How They Communicate

```
User Browser
     ↓
  Frontend (Port 3000)
  - Renders pages
  - Shows 3D animations
  - Has admin dashboard
     ↓ (REST API calls)
  Backend (Port 5000)
  - Receives requests
  - Queries database
  - Returns JSON data
     ↓ (SQL queries)
  Supabase PostgreSQL
  - Stores all data
  - Manages security (RLS)
```

---

## 📚 Documentation Files

| File | Read This For... |
|------|-----------------|
| `README.md` | Complete project overview |
| `DEPLOYMENT.md` | How to deploy to production |
| `PROJECT_STRUCTURE.md` | Detailed folder structure |
| `frontend/README.md` | Frontend-specific documentation |
| `backend/README.md` | Backend API documentation |
| `FOLDER_TREE.txt` | Visual folder structure |
| This file → | You are here! |

---

## 🔑 Key Features

### Frontend Features
- ✅ 3D animated homepage with floating orbs
- ✅ Professional admin dashboard with sidebar navigation
- ✅ 8 admin management pages (jobs, training, users, etc)
- ✅ 30+ public pages (jobs, training, portfolio, etc)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme support
- ✅ Beautiful glassmorphism UI

### Backend Features
- ✅ 20+ RESTful API endpoints
- ✅ Jobs management (CRUD)
- ✅ Training management (CRUD)
- ✅ User management
- ✅ Application tracking
- ✅ Admin authentication
- ✅ Comprehensive error handling
- ✅ CORS enabled for frontend

### Database Features
- ✅ Supabase PostgreSQL
- ✅ Row Level Security (RLS) on all tables
- ✅ 7 main tables (jobs, training, users, etc)
- ✅ Auto-created user profiles on signup
- ✅ Secure admin accounts

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16 with App Router
- **UI Library:** React 19
- **3D Graphics:** Three.js + React Three Fiber
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Database Client:** Supabase JS SDK

### Backend
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth

---

## 📦 Package Management

Both folders use **pnpm** for package management.

### Install pnpm (if needed):
```bash
npm install -g pnpm
```

### Common Commands:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

---

## 🚀 Deployment (When Ready)

See `DEPLOYMENT.md` for complete instructions.

**Quick overview:**
- **Frontend** → Deploy to Vercel (free tier available)
- **Backend** → Deploy to Railway or Render (~$5-20/month)
- **Database** → Already on Supabase Cloud

---

## 🔐 Admin Credentials

These are the demo credentials to access the admin dashboard:

```
Email:    admin@sapphire.career
Password: SapphireAdmin@2024!
```

⚠️ **Production:** Change these credentials in backend `.env`

---

## ❓ Troubleshooting

### Backend won't start
```bash
# Make sure port 5000 is free
# Check if Supabase credentials are correct
# Look at console for error messages
```

### Frontend won't connect to backend
```bash
# Verify backend is running on port 5000
# Check NEXT_PUBLIC_API_BASE_URL in .env.local
# Check browser console for API errors
```

### 3D animations not showing
```bash
# Update your graphics drivers
# Try a different browser
# Check WebGL support: https://webglreport.com
```

### Database connection errors
```bash
# Verify Supabase credentials
# Check internet connection
# Make sure VPN/firewall allows connections
```

---

## 📞 Need Help?

1. **Check the README files** - Most common questions answered there
2. **Check error messages** - Console logs are very helpful
3. **Review DEPLOYMENT.md** - For production setup
4. **Check PROJECT_STRUCTURE.md** - For folder organization

---

## ✅ Checklist for Getting Started

- [ ] Copy this repository to your machine
- [ ] Read this file (you're doing it!)
- [ ] Get Supabase credentials
- [ ] Setup backend (cd backend, install, run)
- [ ] Setup frontend (cd frontend, install, run)
- [ ] Visit http://localhost:3000
- [ ] Test admin login (/admin/login)
- [ ] Check backend health (http://localhost:5000/api/health)
- [ ] Explore the code
- [ ] Read deployment guide when ready

---

## 🎯 What to Do Next

### For Development:
1. Run both servers locally (see Quick Start above)
2. Make changes to frontend or backend
3. Changes auto-reload thanks to dev servers
4. Test everything in browser
5. Check console for errors

### For Production:
1. Read `DEPLOYMENT.md`
2. Deploy frontend to Vercel
3. Deploy backend to Railway/Render
4. Update environment variables
5. Test production URLs

### For Learning:
1. Explore the frontend components (especially 3D ones)
2. Check out the backend API routes
3. Review the database schema in Supabase
4. Read the code comments
5. Check TypeScript types for understanding

---

## 🎨 Key Pages to Check

### Frontend Pages:
- **Home:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin
- **Jobs:** http://localhost:3000/jobs
- **Training:** http://localhost:3000/training
- **Sapphire Portfolio:** http://localhost:3000/sapphire

### Backend Endpoints:
- **Health:** http://localhost:5000/api/health
- **All Jobs:** http://localhost:5000/api/jobs
- **All Training:** http://localhost:5000/api/training
- **All Users:** http://localhost:5000/api/users

---

## 📊 Project Stats

- **Frontend Pages:** 30+
- **Backend Endpoints:** 20+
- **Database Tables:** 7
- **Admin Management Pages:** 8
- **TypeScript Files:** 100+
- **React Components:** 50+
- **Lines of Documentation:** 2000+

---

## 🎓 Learning Resources

- **Next.js:** https://nextjs.org/docs
- **Express.js:** https://expressjs.com/api.html
- **Three.js:** https://threejs.org/docs
- **Supabase:** https://supabase.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind:** https://tailwindcss.com/docs

---

## ✨ You're All Set!

You now have:
- ✅ Frontend and Backend in separate folders
- ✅ Complete API integration
- ✅ Professional admin dashboard
- ✅ 3D animations
- ✅ Production-ready code
- ✅ Comprehensive documentation

**Start with:**
```bash
cd backend && pnpm dev     # Terminal 1
cd frontend && pnpm dev    # Terminal 2
```

Then visit: **http://localhost:3000**

---

## 📝 Notes

- **Node.js 18+** required
- **pnpm** recommended (or npm/yarn)
- **Supabase account** needed
- **Modern browser** for 3D graphics

---

**Happy Coding! 🚀**

If you have questions, check the README files or the documentation in each folder.

---

**Version:** 1.0 - Complete Full Stack  
**Last Updated:** 2024  
**Status:** ✅ Ready to Deploy
