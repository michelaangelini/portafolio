import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' permite que el sitio funcione en cualquier dominio o subcarpeta
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
