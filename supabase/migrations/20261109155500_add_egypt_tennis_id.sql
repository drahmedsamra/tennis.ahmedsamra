-- Migration: Add egypt_tennis_id (رقم قيد الاتحاد) to player_registration_requests
ALTER TABLE public.player_registration_requests
ADD COLUMN IF NOT EXISTS egypt_tennis_id TEXT;

