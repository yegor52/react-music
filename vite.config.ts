import { defineConfig, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }: ConfigEnv) => ({
  plugins: [react()],
  base: command === 'build' ? '/react-music/' : '/',
}))
