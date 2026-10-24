# LaunchPilot AI — Security & Privacy Architecture

## 1. Security Overview

LaunchPilot AI treats security and multi-tenant isolation as core engineering requirements. Data privacy is strictly enforced across the frontend, server endpoints, and database.

---

## 2. Row Level Security (RLS) Posture

Every table in the Supabase PostgreSQL database has Row Level Security enabled:

| Table | RLS Status | Public Access | Authenticated User Access |
| :--- | :--- | :--- | :--- |
| `profiles` | **ENABLED** | None | SELECT & UPDATE restricted to `auth.uid() = id` |
| `projects` | **ENABLED** | None | SELECT, INSERT, UPDATE, DELETE restricted to `auth.uid() = user_id` |
| `tasks` | **ENABLED** | None | SELECT, INSERT, UPDATE, DELETE restricted to `auth.uid() = user_id` |
| `leads` | **ENABLED** | INSERT only | No SELECT/UPDATE/DELETE; restricted to service_role |

### RLS Verification Logic
Even if an attacker gains valid credentials for User A, attempts to query records with `user_id = User_B` return an empty set or a permission violation directly from the PostgreSQL query planner.

---

## 3. Server-Side Protection & Secret Isolation

1. **Zero Secret Leakage**:
   - Private keys (e.g. `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are kept exclusively on the server runtime.
   - Client code never receives or references server-only keys.
   - Only `NEXT_PUBLIC_` variables are accessible in browser bundles.

2. **Server-Side Input Validation**:
   - Both `/api/leads` and `/api/ai/copilot` enforce strict type checking, regex validation, and length bounds.
   - Unsanitized HTML or code blocks are neutralized.

3. **Rate Limiting Protection**:
   - Leads endpoint is limited to 10 submissions/hour per IP.
   - AI Copilot endpoint is limited to 20 requests/minute per client.

---

## 4. Privacy & Safe Data Handling

- Prospective leads captured on the landing page cannot be queried by unauthorized visitors.
- AI prompts and outputs are scoped to the user session without retaining personally identifiable financial data.
