# Deployment Guide - Sapphire Career Hub

Complete guide for deploying the full-stack application to production.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Users                                  │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTPS
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────┐            ┌──▼────┐
    │Vercel  │            │Railway│
    │Frontend │            │Backend │
    │(Port 80)│            │(Port80)│
    └───┬────┘            └──┬────┘
        │                     │
        │ HTTPS (REST API)    │
        └─────────────────────┤
              ┌───────────────┘
              │ PostgreSQL
        ┌─────▼──────┐
        │  Supabase  │
        │ PostgreSQL │
        └────────────┘
```

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository (recommended)
- Environment variables ready

### Step 1: Prepare Frontend

```bash
cd frontend

# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Test build
pnpm build

# Check for errors
pnpm lint
```

### Step 2: Configure Environment

Create `.env.production` in frontend folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.railway.app/api
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://your-domain.com/auth/callback
```

### Step 3: Deploy to Vercel

**Option A: Via GitHub (Recommended)**

1. Push to GitHub:
```bash
git add .
git commit -m "Ready for production"
git push origin main
```

2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "Add New Project"
4. Select GitHub repository
5. Configure project:
   - **Root Directory:** `frontend`
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`

6. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_BASE_URL`
   - etc.

7. Click "Deploy"

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod

# Set environment variables during deployment or use vercel env:
vercel env:push .env.production
```

### Step 4: Verify Deployment

```bash
# Test the deployed site
curl https://your-domain.vercel.app

# Check logs
vercel logs --tail
```

---

## Backend Deployment (Railway or Render)

### Option A: Railway (Recommended)

#### Prerequisites
- Railway account
- GitHub repository

#### Step 1: Prepare Backend

```bash
cd backend

# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Test build
pnpm build

# Test start
pnpm start
```

#### Step 2: Create .env for Production

```env
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
SUPABASE_ANON_KEY=your_anon_key
CORS_ORIGIN=https://your-domain.com
ADMIN_EMAIL=admin@sapphire.career
ADMIN_PASSWORD=SapphireAdmin@2024!
```

#### Step 3: Deploy to Railway

1. Go to [Railway Dashboard](https://railway.app)
2. Click "Create New Project"
3. Select "Deploy from GitHub"
4. Choose your repository
5. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pnpm build`
   - **Start Command:** `pnpm start`

6. Add Environment Variables in Railway dashboard:
   - Copy variables from `.env` file

7. Deploy and note the generated URL

#### Step 4: Update Frontend API URL

After backend deployment, you'll get a URL like `https://xyz.railway.app`

Update in Vercel:
1. Go to Vercel Project Settings
2. Environment Variables
3. Set `NEXT_PUBLIC_API_BASE_URL=https://xyz.railway.app/api`
4. Redeploy frontend

---

### Option B: Render

#### Step 1: Prepare Backend
Same as Railway - see above

#### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://render.com)
2. Click "New Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name:** `sapphire-backend`
   - **Environment:** Node
   - **Build Command:** `pnpm build`
   - **Start Command:** `pnpm start`
   - **Root Directory:** `backend`

5. Add Environment Variables (copy from `.env`)
6. Select plan and deploy

#### Step 3: Update Frontend API URL

Note the Render URL and update Vercel variables

---

## Database (Supabase Cloud)

Your database is already on Supabase Cloud, which is production-ready.

### Verify Production Database

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Check:
   - All tables exist and have data
   - RLS policies are enabled
   - Backups are configured

### Database Backup Strategy

1. **Automatic Backups** (included with Supabase Pro):
   - Daily backups retained 30 days
   - Point-in-time recovery available

2. **Manual Backup**:
```bash
# Export database
pg_dump postgresql://user:password@host/dbname > backup.sql

# Restore from backup
psql postgresql://user:password@host/dbname < backup.sql
```

3. **Enable Backup Redundancy**:
   - Consider Supabase Pro plan for guaranteed backups
   - Enable all backup features in dashboard

---

## Environment Variables Summary

### Frontend (.env.production)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
```

### Backend (.env)
```
PORT
NODE_ENV
SUPABASE_URL
SUPABASE_SERVICE_KEY
SUPABASE_ANON_KEY
CORS_ORIGIN
ADMIN_EMAIL
ADMIN_PASSWORD
```

---

## SSL/TLS Certificates

- **Vercel:** Automatic SSL (*.vercel.app)
- **Custom Domain:** Add to Vercel, auto-configured
- **Railway/Render:** Automatic SSL included
- **Database:** Supabase provides SSL

---

## Monitoring & Logs

### Frontend (Vercel)
```bash
# View logs
vercel logs --tail

# View deployments
vercel list

# Check performance
# Dashboard > Analytics > Core Web Vitals
```

### Backend (Railway)
1. Go to Railway dashboard
2. Select project
3. View real-time logs
4. Check deployment status

### Database (Supabase)
1. Go to Supabase dashboard
2. Check query performance in pgAdmin
3. Monitor resource usage

---

## Performance Optimization

### Frontend
- Image optimization enabled
- Code splitting automatic
- CSS minification automatic
- Caching headers configured

### Backend
- Connection pooling with Supabase
- Response compression enabled
- Request timeout: 30s

### Database
- Query indexes on frequently searched fields
- Connection limits configured
- Automatic query optimization

---

## Scaling Strategy

### Stage 1: MVP (Current)
- 1 Vercel deployment
- 1 Railway backend
- Shared Supabase

### Stage 2: Growth
- Vercel auto-scales
- Railway Standard plan
- Supabase Pro plan

### Stage 3: Enterprise
- Vercel Enterprise
- Railway for multiple backends
- Supabase Enterprise
- CDN for static content

---

## Troubleshooting Deployments

### Frontend Build Fails
```bash
# Clear build cache
vercel env:pull
pnpm clean
pnpm install
pnpm build

# Check for errors
vercel logs
```

### Backend Not Starting
```bash
# Check logs
railway logs

# Test locally
pnpm dev

# Verify environment variables
# Dashboard > Settings > Environment Variables
```

### API Connection Errors
1. Verify backend URL is correct
2. Check CORS in backend .env
3. Verify Supabase credentials
4. Check network firewall

---

## Rollback Procedure

### Frontend (Vercel)
1. Go to Deployments
2. Select previous deployment
3. Click "Promote to Production"

### Backend (Railway)
1. Go to Deployments
2. Select previous version
3. Redeploy

---

## Cost Estimation

### Monthly Costs
- **Vercel Hobby:** Free tier available
- **Railway:** $5-20/month depending on usage
- **Render:** $7-20/month
- **Supabase:** Free tier (includes $10 credits)
- **Domain:** ~$10-15/year

**Total: ~$20-40/month** for small to medium scale

---

## Security Checklist

- [ ] Change default admin password
- [ ] Enable 2FA on all service accounts
- [ ] Setup HTTPS (automatic on all platforms)
- [ ] Configure CORS properly
- [ ] Enable RLS on all database tables
- [ ] Set up database backups
- [ ] Configure environment variables securely
- [ ] Enable audit logging
- [ ] Monitor failed login attempts
- [ ] Regular security updates

---

## Post-Deployment

### Testing
```bash
# Test API endpoints
curl https://your-backend-url/api/health

# Test frontend
# Visit https://your-domain.com
# Login with admin credentials
# Test all major features
```

### Documentation
- Update README with production URLs
- Document any configuration changes
- Create runbooks for common tasks

### Monitoring
- Setup error tracking (Sentry)
- Setup performance monitoring
- Setup uptime monitoring
- Configure alerts

---

For more information, refer to:
- Vercel docs: https://vercel.com/docs
- Railway docs: https://docs.railway.app
- Render docs: https://render.com/docs
- Supabase docs: https://supabase.com/docs
