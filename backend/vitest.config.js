import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => ({
  test: {
    env: loadEnv('test', process.cwd(), ''),
    setupFiles: ['./tests/setup.js'],
    fileParallelism: false, 
  },
}));