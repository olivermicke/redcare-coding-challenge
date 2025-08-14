import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import pluginRouter from '@tanstack/eslint-plugin-router';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'@tanstack/router': pluginRouter,
		},
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		rules: {
			'@tanstack/router/create-route-property-order': 'error',
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
]);
