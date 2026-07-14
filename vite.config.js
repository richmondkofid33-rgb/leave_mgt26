import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change "leave-ledger-2026" below to match your actual GitHub repo name.
// If your repo is https://github.com/yourorg/leave-ledger-2026, base stays as is.
// If deploying to a custom domain or a "username.github.io" root repo, set base to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/leave-ledger-2026/',
})
