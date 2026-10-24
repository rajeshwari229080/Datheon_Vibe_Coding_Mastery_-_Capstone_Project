-- ==============================================================================
-- Migration: 20261024000002_rls_policies.sql
-- Description: Row Level Security (RLS) Policies for Multi-Tenant Data Isolation
-- Tables Protected: profiles, projects, tasks, leads
-- ==============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 2. Profiles Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 3. Projects Policies
-- Users can only select their own projects
CREATE POLICY "Users can select own projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert projects assigned to themselves
CREATE POLICY "Users can insert own projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own projects
CREATE POLICY "Users can update own projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own projects
CREATE POLICY "Users can delete own projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Tasks Policies
-- Users can only select tasks belonging to them
CREATE POLICY "Users can select own tasks"
  ON public.tasks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert tasks for their projects
CREATE POLICY "Users can insert own tasks"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own tasks
CREATE POLICY "Users can update own tasks"
  ON public.tasks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own tasks
CREATE POLICY "Users can delete own tasks"
  ON public.tasks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. Leads Policies (Public Lead Capture)
-- Anyone (including unauthenticated visitors) can submit a lead form
CREATE POLICY "Public visitors can submit leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public reading or modifications of leads (only service-role or admin)
-- Intentionally omitting SELECT/UPDATE/DELETE policies for anon/authenticated
-- to protect prospective customer emails and private inquiries.
