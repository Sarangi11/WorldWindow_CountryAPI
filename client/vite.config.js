import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://restcountries.com/v3.1',
        secure: false,
      },
    },
  },
  plugins: [
    react(), // This is correct for Vite + React with SWC
  ],
})
