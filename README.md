# Leave Ledger 2026 — Amnesty International Ghana

A staff leave management system with real accounts, so everyone can log in remotely from
their own phone or laptop and see live, shared data — approvals, balances, the team calendar.

## What's built

- Email/password accounts (staff self-register; Facilitator activates them)
- Role-based access: Employee, Approver, Facilitator
- Leave application form with Ghana public-holiday-aware working-day calculation
- Document upload (medical certificates etc.) stored privately per staff member
- Approval workflow with email notification to Approver + Facilitator on submission,
  and to the employee on decision
- Cancellation flow with automatic balance restoration
- Real-time leave balance tracking per leave type, per year
- Team calendar (month view, shows who's on approved leave)
- Analytics: leave days by type, by department, plus a wellbeing pulse summary
- Wellbeing check-in (private mood/workload pulse survey)
- Facilitator back-end: activate accounts, change roles/departments, CSV export
- Audit trail of every state-changing action, visible to the Facilitator
- Mobile-friendly responsive layout
- Ghana Labour Act 2003 (Act 651) leave-type defaults pre-loaded (see schema.sql)

## What's NOT automated yet (by design, per your last answer)

- **Payroll integration** — not wired up. The Facilitator's CSV export can be fed into
  whatever payroll process you use manually for now.
- **SharePoint/OneDrive auto-backup** — not wired up. Supabase's own dashboard has a
  "Database backups" feature you can schedule (Settings → Database → Backups) as a
  first line of defense; a script that pushes exports into SharePoint automatically
  would need a Microsoft Graph API app registration, which I can help set up in a
  future round if you want it.

Say the word whenever you want either of these built — I kept the CSV export in
Staff Admin specifically so it's a clean handoff point.

## One-time setup (do this before anything works)

### 1. Create a Supabase project
1. Go to supabase.com → New project (free tier is enough for ~20 staff).
2. Once created, go to the **SQL Editor**, paste the entire contents of
   `supabase/schema.sql`, and run it. This creates every table, security rule, and
   the document storage bucket in one go.
3. Go to **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
4. Paste them into `src/lib/supabase.js` in place of `YOUR_SUPABASE_PROJECT_URL` and
   `YOUR_SUPABASE_ANON_KEY`.
5. Go to **Authentication → Settings** and turn off "Confirm email" if you want staff
   to log in immediately after signup (or leave it on for extra security — they'll
   just need to click a confirmation link first).

### 2. Set up EmailJS (same approach as your existing app)
1. In emailjs.com, create three templates: one for "new leave request" (sent to the
   approver/facilitator), one for "leave decision" (sent to the employee), and one for
   "new account pending" (sent to the facilitator).
2. Copy your Service ID, Public Key, and the three Template IDs into `src/lib/email.js`.
3. In `src/pages/Signup.jsx`, update `FACILITATOR_EMAIL` to your real email address.

### 3. Make yourself Facilitator
The first person to sign up needs to be manually promoted, since nobody exists yet to
activate anyone. After you sign up once, go to Supabase → **Table Editor → staff**,
find your row, and set `role` to `facilitator` and `is_active` to `true` directly in
the table. From then on you can do everything else from the in-app Staff Admin page.

### 4. Deploy to GitHub Pages
1. Create a new GitHub repo, e.g. `leave-ledger-2026`.
2. If your repo name is different from `leave-ledger-2026`, edit the `base` value in
   `vite.config.js` to match (e.g. `/your-repo-name/`).
3. Push this whole folder to the repo's `main` branch.
4. In the repo, go to **Settings → Pages** and set Source to "GitHub Actions".
5. The included workflow (`.github/workflows/deploy.yml`) will build and publish
   automatically on every push to `main`. Your site will be live at
   `https://yourusername.github.io/leave-ledger-2026/`.

## Local development
```
npm install
npm run dev
```

## A note on the free tiers
Supabase's free tier (500MB database, 1GB file storage, 50,000 monthly active users)
comfortably covers a 20-person NGO. GitHub Pages is free for public repos. EmailJS's
free tier gives 200 emails/month — for ~20 staff with occasional leave requests that
should be plenty, but worth watching if usage grows.
