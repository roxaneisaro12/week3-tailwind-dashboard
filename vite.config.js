
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/week3-tailwind-dashboard/',
  plugins: [tailwindcss()],
})
