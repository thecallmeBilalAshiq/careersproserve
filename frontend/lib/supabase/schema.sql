-- Careers Pro Serve Database Schema for Supabase
-- Launch Version: 1.0

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. JOBS TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary_min NUMERIC(10, 2),
    salary_max NUMERIC(10, 2),
    job_type VARCHAR(50) DEFAULT 'Full-time',
    experience_level VARCHAR(50) DEFAULT 'Mid-Level',
    category VARCHAR(100) DEFAULT 'General',
    status VARCHAR(50) DEFAULT 'published', -- 'published', 'pending', 'rejected', 'closed'
    is_proctor_submitted BOOLEAN DEFAULT FALSE,
    proctor_name VARCHAR(255),
    proctor_email VARCHAR(255),
    proctor_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. JOB APPLICATIONS TABLE (Guest Applications)
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
    cv_url TEXT NOT NULL, -- Cloudinary Document URL
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'reviewing', 'accepted', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TRAININGS TABLE
CREATE TABLE IF NOT EXISTS public.trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration_hours INT NOT NULL DEFAULT 10,
    level VARCHAR(50) DEFAULT 'All Levels',
    price NUMERIC(10, 2) NOT NULL,
    instructor VARCHAR(255) DEFAULT 'Careers Pro Serve Team',
    category VARCHAR(100) DEFAULT 'Professional Development',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TRAINING ENROLLMENTS TABLE (Payment Receipts & Screenshot Proof)
CREATE TABLE IF NOT EXISTS public.training_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    training_id UUID REFERENCES public.trainings(id) ON DELETE CASCADE,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    fee_amount NUMERIC(10, 2) NOT NULL,
    account_assigned VARCHAR(255),
    payment_screenshot_url TEXT NOT NULL, -- Cloudinary Image URL
    status VARCHAR(50) DEFAULT 'pending_verification', -- 'pending_verification', 'verified', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PROCTOR JOB REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.proctor_job_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proctor_name VARCHAR(255) NOT NULL,
    proctor_email VARCHAR(255) NOT NULL,
    proctor_phone VARCHAR(50) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    salary_range VARCHAR(100),
    job_description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MYSTERY SHOPPER REQUESTS TABLE (Executive Team Hiring)
CREATE TABLE IF NOT EXISTS public.mystery_shopper_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    role_title VARCHAR(100) DEFAULT 'CEO / Business Owner',
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    team_size INT DEFAULT 5,
    project_scope TEXT NOT NULL,
    budget_range VARCHAR(100),
    status VARCHAR(50) DEFAULT 'new', -- 'new', 'in_progress', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TALENT POOL TABLE (General Future Applications)
CREATE TABLE IF NOT EXISTS public.talent_pool (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
    years_of_experience INT DEFAULT 0,
    highest_education VARCHAR(100),
    certifications TEXT,
    skills TEXT NOT NULL,
    field_of_expertise VARCHAR(100),
    cv_url TEXT NOT NULL, -- Cloudinary Document URL
    additional_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS Policies (Public Read for Jobs/Trainings, Public Insert for Forms, Admin Full Access)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proctor_job_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mystery_shopper_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talent_pool ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for Published Jobs and Trainings
CREATE POLICY "Public Read Published Jobs" ON public.jobs FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Trainings" ON public.trainings FOR SELECT USING (true);

-- Allow Public Guest Inserts for Forms
CREATE POLICY "Public Insert Job Applications" ON public.job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Training Enrollments" ON public.training_enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Proctor Requests" ON public.proctor_job_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Mystery Shopper Requests" ON public.mystery_shopper_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Talent Pool" ON public.talent_pool FOR INSERT WITH CHECK (true);

-- Allow Full Access to Service Role / Admin
CREATE POLICY "Admin All Access Jobs" ON public.jobs FOR ALL USING (true);
CREATE POLICY "Admin All Access Job Applications" ON public.job_applications FOR ALL USING (true);
CREATE POLICY "Admin All Access Trainings" ON public.trainings FOR ALL USING (true);
CREATE POLICY "Admin All Access Training Enrollments" ON public.training_enrollments FOR ALL USING (true);
CREATE POLICY "Admin All Access Proctor Requests" ON public.proctor_job_requests FOR ALL USING (true);
CREATE POLICY "Admin All Access Mystery Shopper Requests" ON public.mystery_shopper_requests FOR ALL USING (true);
CREATE POLICY "Admin All Access Talent Pool" ON public.talent_pool FOR ALL USING (true);
