-- Add UPDATE policy to allow score updates on signups table
-- This maintains the same security posture as INSERT (anonymous access with client-side GDPR consent checks)
CREATE POLICY "Allow score updates"
ON public.signups
FOR UPDATE
USING (true)
WITH CHECK (true);