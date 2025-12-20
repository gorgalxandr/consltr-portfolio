import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../../certs/server-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../../certs/server-cert.pem')),
    },
    port: 5173,
    host: true, // Allow external connections
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    // Ensure HTTPS URLs in production
    'process.env.VITE_API_URL': JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? 'https://api.consltr.com' 
        : 'https://localhost:8443'
    ),
  },
})
