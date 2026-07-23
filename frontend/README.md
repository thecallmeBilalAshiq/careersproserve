# Sapphire Career Hub - Frontend

Premium 3D frontend application built with Next.js 16, React 19, Three.js, and Tailwind CSS.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Backend server running on port 5000

### Installation

```bash
cd frontend
pnpm install
```

### Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Key Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### Running the Frontend

**Development Mode (with hot reload):**
```bash
pnpm dev
```

**Production Build:**
```bash
pnpm build
pnpm start
```

Frontend will start on `http://localhost:3000`

## Features

### User-Facing Pages
- **Home** - 3D animated hero with floating orbs, job showcase
- **Jobs** - Searchable job listings with filters
- **Training** - Training programs with detailed views
- **Portfolio** - Sapphire Loyal executive portfolio
- **About** - Company information
- **Blog** - Blog section
- **Contact** - Contact form
- **FAQ** - Frequently asked questions
- **Authentication** - Login/Register pages

### Admin Features (Behind Admin Login)
- **Dashboard** - Admin control center with management cards
- **Jobs Management** - CRUD operations for jobs
- **Training Management** - Create and manage training programs
- **Users Management** - View and manage user accounts
- **Applications** - Review job applications
- **Categories** - Manage job/training categories
- **Messages** - Contact form submissions

### 3D Components
- Floating orbs background animation
- 3D particle system
- 3D bar charts for analytics
- Smooth transitions and animations

### Technologies
- **Framework:** Next.js 16 with App Router
- **UI:** React 19 with TypeScript
- **3D:** Three.js + React Three Fiber + Drei
- **Styling:** Tailwind CSS v4 with glassmorphism
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion
- **Database:** Supabase with RLS
- **State:** Zustand + React Context

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Home page
│   ├── admin/                # Admin pages
│   ├── jobs/                 # Jobs pages
│   ├── training/             # Training pages
│   ├── sapphire/             # Portfolio page
│   ├── auth/                 # Authentication pages
│   └── api/                  # API routes (server)
├── components/
│   ├── 3d/                   # 3D components
│   ├── layout/               # Layout components (Navbar, Footer)
│   └── common/               # Reusable components
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities and helpers
├── public/                   # Static assets
└── README.md
```

## Admin Credentials

Access admin dashboard at `/admin/login`:
- **Email:** `admin@sapphire.career`
- **Password:** `SapphireAdmin@2024!`

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with 3D background |
| `/jobs` | Job listings |
| `/training` | Training programs |
| `/sapphire` | Executive portfolio |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard |
| `/admin/jobs` | Jobs management |
| `/admin/users` | Users management |
| `/register` | User registration |
| `/login` | User login |

## API Integration

Frontend calls backend API endpoints at `NEXT_PUBLIC_API_BASE_URL`:

```typescript
// Example API call
const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`);
const data = await response.json();
```

## Development

### Hot Reload
Changes to components, pages, and styles automatically refresh in browser.

### TypeScript
Strict type checking enabled throughout the project.

### Styling
- Tailwind CSS v4 with custom tokens
- Dark/Light mode support
- Glassmorphism effects
- Responsive design

## Deployment

### On Vercel (Recommended)

1. Push code to GitHub
2. Import project on Vercel
3. Set environment variables
4. Deploy automatically

```bash
vercel deploy
```

### On Other Platforms

```bash
pnpm build
pnpm start
```

## Performance

- Next.js 16 with Turbopack
- React Server Components
- Image optimization
- Code splitting
- Lazy loading

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- 3D animations require modern GPU
- WebGL support needed for 3D scenes
- Mobile 3D performance may vary

## Future Enhancements

- [ ] Dark mode toggle persistence
- [ ] Advanced search filters
- [ ] User profiles page
- [ ] Email notifications
- [ ] Real-time chat
- [ ] Video streaming
- [ ] AI recommendations
- [ ] Analytics dashboard

## Support

For issues or questions, refer to main project documentation.

## License

MIT License - See LICENSE file for details
