// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()



//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // 👈 add this

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 👈 this sets up @/ as alias for src/
    }
  }
})
