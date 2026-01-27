-- Create signups table to store user registrations
CREATE TABLE public.signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  quiz_id TEXT,
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (for quiz submissions)
CREATE POLICY "Allow anonymous inserts" 
ON public.signups 
FOR INSERT 
WITH CHECK (true);

-- Allow reading own signup (based on email, for checking if already participated)
CREATE POLICY "Allow reading signups" 
ON public.signups 
FOR SELECT 
USING (true);