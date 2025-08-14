import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig({
	base: '/redcare-coding-challenge/',
	plugins: [
		tailwindcss(),
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
		}),
		react(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/test-utils/test-setup.ts',
		watch: false,
	},
} as UserConfig);
