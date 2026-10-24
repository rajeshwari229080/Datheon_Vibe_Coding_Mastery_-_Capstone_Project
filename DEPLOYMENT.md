# LaunchPilot AI — Production Deployment Guide

This guide details how to deploy LaunchPilot AI to production using **GitHub**, **Supabase**, and **Vercel**.

---

## 1. Supabase Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Apply migration `supabase/migrations/20261024000001_initial_schema.sql` to initialize tables, indexes, and user triggers.
4. Apply migration `supabase/migrations/20261024000002_rls_policies.sql` to configure Row Level Security.
5. In **Project Settings** -> **API**, copy:
   - `Project URL`
   - `Project API anon key`

---

## 2. Vercel Deployment

1. Push your repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository:
   `rajeshwari229080/Datheon_Vibe_Coding_Mastery_-_Capstone_Project`
4. In the **Environment Variables** section, configure:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key
   - `OPENAI_API_KEY`: (Optional) Your OpenAI API Key for live AI responses
   - `AI_MODEL`: `gpt-4o-mini`
5. Click **Deploy**. Vercel will run the production build automatically.

---

## 3. Verification Checklist

- [x] Landing page loads at the live public URL
- [x] Dark/light theme toggle persists across refreshes
- [x] Lead capture form successfully persists entries
- [x] User sign up & login creates an authenticated session
- [x] Projects and tasks persist in PostgreSQL
- [x] AI Copilot generates structured roadmaps and actionable tasks
- [x] Production build passes with zero lint or TypeScript warnings
