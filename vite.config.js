import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { viteReactNativeWeb } from 'vite-plugin-react-native-web';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteReactNativeWeb()],
  server: {
    host: '0.0.0.0', 
  },
  resolve: {
    alias: {
      // Добавляем алиас для модулей React Native
      'react-native$': 'react-native-web',
    },
  },
})

