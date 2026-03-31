import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // <--- ISSO LIBERA O ACESSO EXTERNO (DOCKER)
    port: 5173,      // Garante a porta
    watch: {
      usePolling: true, // Ajuda o Windows/WSL a detectar mudanças
    }
  }
})