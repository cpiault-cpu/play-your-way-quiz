-- Remove the dangerous SELECT policy that exposes all user emails
DROP POLICY IF EXISTS "Allow reading signups" ON public.signups;

-- Remove the dangerous UPDATE policy that allows anyone to modify any record
DROP POLICY IF EXISTS "Allow score updates" ON public.signups;
