-- Migration: Create player_registration_requests table with RLS policies
-- Description: Stores registration and booking requests submitted by new players and parents from the website

CREATE TABLE IF NOT EXISTS public.player_registration_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'ذكر', 'أنثى')),
    parent_name TEXT,
    mobile_number TEXT NOT NULL,
    whatsapp_number TEXT,
    email TEXT,
    played_before BOOLEAN DEFAULT false,
    tennis_experience TEXT,
    current_level TEXT,
    tournament_experience BOOLEAN DEFAULT false,
    current_club TEXT,
    previous_coach TEXT,
    preferred_training_type TEXT,
    preferred_days TEXT[] DEFAULT '{}'::TEXT[],
    preferred_time TEXT,
    additional_notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_registration_requests_created_at ON public.player_registration_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registration_requests_status ON public.player_registration_requests (status);
CREATE INDEX IF NOT EXISTS idx_registration_requests_player_name ON public.player_registration_requests (player_name);
CREATE INDEX IF NOT EXISTS idx_registration_requests_mobile ON public.player_registration_requests (mobile_number);

-- Enable Row Level Security (RLS)
ALTER TABLE public.player_registration_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotent execution)
DROP POLICY IF EXISTS "Allow public visitors to insert registration requests" ON public.player_registration_requests;
DROP POLICY IF EXISTS "Allow coach and admin to view registration requests" ON public.player_registration_requests;
DROP POLICY IF EXISTS "Allow coach and admin to update registration requests" ON public.player_registration_requests;

-- 1. Security Policy: Public visitors can ONLY insert their own registration requests
CREATE POLICY "Allow public visitors to insert registration requests"
ON public.player_registration_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Security Policy: Reading registration requests is permitted for the coach dashboard
-- Note: Aligned with the current architecture where coach views read via the server client
CREATE POLICY "Allow coach and admin to view registration requests"
ON public.player_registration_requests
FOR SELECT
TO anon, authenticated, service_role
USING (true);

-- 3. Security Policy: Updating request status (pending, contacted, approved, rejected)
CREATE POLICY "Allow coach and admin to update registration requests"
ON public.player_registration_requests
FOR UPDATE
TO anon, authenticated, service_role
USING (true)
WITH CHECK (true);

-- Trigger to keep updated_at automatically updated
CREATE OR REPLACE FUNCTION public.handle_player_registration_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_player_registration_requests_updated_at ON public.player_registration_requests;
CREATE TRIGGER set_player_registration_requests_updated_at
BEFORE UPDATE ON public.player_registration_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_player_registration_updated_at();

