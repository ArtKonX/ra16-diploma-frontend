import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

export default defineConfig({
  resolve: {
    alias: {
      "@data": path.resolve(__dirname, "./data"),
      "@src": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    }
  },
  plugins: [react()],
})
