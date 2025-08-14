import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, type UserConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
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
