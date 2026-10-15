import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ihome-platform-/', // <-- must match repo name exactly with dash
})
