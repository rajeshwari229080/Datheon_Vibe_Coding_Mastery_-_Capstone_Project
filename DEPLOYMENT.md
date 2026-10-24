# LaunchPilot AI — Production Deployment Guide

This guide details how to deploy LaunchPilot AI to production using **GitHub Pages (Automated CI/CD)**, **Vercel**, and **Supabase Cloud**.

---

## 🌐 1. GitHub Pages Hosting & Automated Deployment

LaunchPilot AI includes a full GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds, tests, and deploys the application directly to GitHub Pages on every push to `main`.

### Step 1: Configure GitHub Repository Settings
1. Open your repository on GitHub:  
   👉 `https://github.com/rajeshwari229080/Datheon_Vibe_Coding_Mastery_-_Capstone_Project`
2. Click **Settings** in the top navigation bar.
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment > Source**:
   - **Recommended Choice:** Select **`GitHub Actions`** from the dropdown.  
     *(GitHub will automatically run `.github/workflows/deploy.yml` whenever you push code)*.
   - **Alternative Choice:** If you prefer the classic branch method, select **`Deploy from a branch`**, then select branch **`gh-pages`** and folder **`/ (root)`**.

### Step 2: (Optional) Add Repository Secrets
If you want live Supabase Cloud database connectivity on GitHub Pages:
1. In repository **Settings**, go to **Secrets and variables ➔ Actions**.
2. Click **New repository secret** and add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key

*(Note: If omitted, LaunchPilot AI automatically runs in its persistent local storage fallback mode with full CRUD and deterministic AI synthesizer capabilities!)*

### Step 3: Trigger Deployment
- Any commit pushed to `main` will automatically trigger the workflow:
  ```bash
  git push origin main
  ```
- Or trigger manually: Go to **Actions** tab ➔ **"Build and Deploy to GitHub Pages"** ➔ **"Run workflow"**.

### Step 4: Access Your Live GitHub Pages Site
Your site will be live at:
👉 **`https://rajeshwari229080.github.io/Datheon_Vibe_Coding_Mastery_-_Capstone_Project/`**

---

## ⚡ 2. Vercel Deployment (Full Serverless Node.js Runtime)

Vercel provides a full Node.js serverless execution environment, supporting dynamic server routes:

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
   - `OPENAI_API_KEY`: *(Optional)* Your OpenAI API Key for live AI responses
   - `AI_MODEL`: `gpt-4o-mini`
5. Click **Deploy**. Vercel will run the production build automatically.

---

## 🗄️ 3. Supabase Database Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Apply migration `supabase/migrations/20261024000001_initial_schema.sql` to initialize tables, indexes, and user triggers.
4. Apply migration `supabase/migrations/20261024000002_rls_policies.sql` to configure Row Level Security.
5. In **Project Settings** -> **API**, copy:
   - `Project URL`
   - `Project API anon key`

---

## ✅ 4. Verification Checklist

- [x] Landing page loads at the live public URL
- [x] Dark/light theme toggle persists across refreshes without layout shifts
- [x] Lead capture form successfully persists entries (via server route or fallback)
- [x] User sign up & login creates an authenticated session
- [x] Projects and tasks persist in PostgreSQL / LocalStorage
- [x] AI Copilot generates structured roadmaps and actionable tasks
- [x] Automated Vitest test suite passes with 100% green status
- [x] Both static export (`npm run build:pages`) and standard production build (`npm run build`) pass cleanly
