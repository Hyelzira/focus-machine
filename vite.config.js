import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Import the plugin

export default defineConfig({
  base:'./',
  plugins: [
    react(),
    tailwindcss(), // Add it to the plugins array
  ],
})