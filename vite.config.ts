import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages (https://<user>.github.io/soracodelab/) はサブパス配下での公開になるため、
// 本番ビルドのみ base を合わせる。開発サーバーはルート('/')のままにする
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/soracodelab/' : '/',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
}))
