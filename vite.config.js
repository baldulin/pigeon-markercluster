import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
      copyPublicDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.js'),
        name: "pigeon-markercluster",
        formats: ['es', 'umd'],
        fileName: (format) => `pigeon-markercluster.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react/jsx-runtime', 'react-dom', "pigeon-maps", "supercluster"],
        output: {
          globals: {
            react: 'React',
            'react/jsx-runtime': 'react/jsx-runtime',
            'react-dom': 'ReactDOM',
            tailwindcss: 'tailwindcss',
            "pigeon-maps": "pigeon-maps",
            "supercluster": "Supercluster",
          },
        },
      },
    },
});
