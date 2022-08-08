import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true,
    // The name of this option is unintuitive to me, but this ensures that the CSS
    // _is_ split into a separate file
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // file names will contain embedded hashes without these options
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  // The default esbuild options do not allow for JSX in .js files,
  // so we override
  esbuild: {
    loader: 'tsx',
    include: /\.(tsx?|jsx?)$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
});
