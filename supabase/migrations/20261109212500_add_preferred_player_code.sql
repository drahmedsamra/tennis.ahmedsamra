-- Migration: Add preferred_player_code column to player_registration_requests table
-- Description: Allows new registrants to choose an optional custom access code for their player portal

ALTER TABLE public.player_registration_requests
ADD COLUMN IF NOT EXISTS preferred_player_code TEXT;

