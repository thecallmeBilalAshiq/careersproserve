# Sapphire Career Hub - Backend API

Professional REST API backend for Sapphire Career Hub platform built with Express.js and TypeScript.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account with credentials

### Installation

```bash
cd backend
pnpm install
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required Environment Variables:**
```
PORT=5000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
SUPABASE_ANON_KEY=your_supabase_anon_key
CORS_ORIGIN=http://localhost:3000
ADMIN_EMAIL=admin@sapphire.career
ADMIN_PASSWORD=SapphireAdmin@2024!
```

### Running the Server

**Development Mode (with hot reload):**
```bash
pnpm dev
```

**Production Mode:**
```bash
pnpm build
pnpm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health` - Server health status

### Jobs Management
- **GET** `/api/jobs` - Get all jobs
- **GET** `/api/jobs/:id` - Get job by ID
- **POST** `/api/jobs` - Create job (admin only)
- **PUT** `/api/jobs/:id` - Update job (admin only)
- **DELETE** `/api/jobs/:id` - Delete job (admin only)
- **GET** `/api/jobs/category/:categoryId` - Get jobs by category

### Training Programs
- **GET** `/api/training` - Get all training programs
- **GET** `/api/training/:id` - Get training by ID
- **POST** `/api/training` - Create training (admin only)
- **PUT** `/api/training/:id` - Update training (admin only)
- **DELETE** `/api/training/:id` - Delete training (admin only)

### Users
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user
- **GET** `/api/users/stats/count` - Get user count

### Applications
- **GET** `/api/applications` - Get all applications
- **GET** `/api/applications/job/:jobId` - Get applications for a job
- **GET** `/api/applications/user/:userId` - Get user's applications
- **POST** `/api/applications` - Create application
- **PUT** `/api/applications/:id/status` - Update application status
- **GET** `/api/applications/stats/by-status` - Get application stats

### Authentication
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/logout` - User logout
- **POST** `/api/auth/admin/verify` - Verify admin credentials
- **GET** `/api/auth/admin/list` - Get admin users
- **POST** `/api/auth/admin/create` - Create admin user

## API Response Format

All responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": [...],
  "count": 10,
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Database Schema

### Tables
- `categories` - Job and training categories
- `jobs` - Job listings
- `training` - Training programs
- `profiles` - User profiles
- `applications` - Job applications
- `enrollments` - Training enrollments
- `admin_users` - Admin user accounts

All tables have Row Level Security (RLS) enabled for data protection.

## Project Structure

```
backend/
├── src/
│   ├── index.ts           # Main server file
│   └── routes/
│       ├── jobs.ts        # Jobs endpoints
│       ├── training.ts    # Training endpoints
│       ├── users.ts       # Users endpoints
│       ├── applications.ts # Applications endpoints
│       └── auth.ts        # Authentication endpoints
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Development

### Code Style
- TypeScript for type safety
- Express.js for routing
- Supabase SDK for database access
- ESM modules

### Linting
```bash
pnpm lint
```

## Deployment

### On Railway or Render

1. Connect your GitHub repository
2. Set environment variables in deployment dashboard
3. Deploy with:
   ```bash
   pnpm build
   ```
4. Set start command: `pnpm start`

### On Vercel (as serverless)

Adapt routes to Vercel serverless functions if needed.

## Admin Credentials

Default admin credentials (change in production):
- **Email:** `admin@sapphire.career`
- **Password:** `SapphireAdmin@2024!`

## Error Handling

- 400: Bad Request (missing or invalid fields)
- 401: Unauthorized (invalid credentials)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error

## CORS

CORS is enabled for the frontend URL specified in `CORS_ORIGIN` environment variable.

## Future Enhancements

- [ ] JWT token authentication
- [ ] Rate limiting
- [ ] Advanced caching
- [ ] WebSocket support
- [ ] File upload handling
- [ ] Email notifications
- [ ] Advanced analytics

## Support

For issues or questions, please refer to the main project documentation.
