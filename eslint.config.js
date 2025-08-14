import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import pluginRouter from '@tanstack/eslint-plugin-router';
import pluginQuery from '@tanstack/eslint-plugin-query';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import reactCompiler from 'eslint-plugin-react-compiler';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			'@tanstack/router': pluginRouter,
			'@tanstack/query': pluginQuery,
			'simple-import-sort': simpleImportSort,
			'react-compiler': reactCompiler,
		},
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		rules: {
			'@tanstack/router/create-route-property-order': 'error',
			'@tanstack/query/exhaustive-deps': 'warn',
			'@tanstack/query/stable-query-client': 'error',
			'react-compiler/react-compiler': 'error',
			'simple-import-sort/imports': [
				'warn',
				{
					// https://dev.to/receter/automatic-import-sorting-in-vscode-275m
					groups: [
						// 1. Side effect imports at the start. For me this is important because I want to import reset.css and global styles at the top of my main file.
						['^\\u0000'],
						// 2. `react` and packages: Things that start with a letter (or digit or underscore), or `@` followed by a letter.
						['^react$', '^@?\\w'],
						// 3. Absolute imports and other imports such as Vue-style `@/foo`.
						// Anything not matched in another group. (also relative imports starting with "../")
						['^@', '^'],
						// 4. relative imports from same folder "./" (I like to have them grouped together)
						['^\\./'],
						// 5. style module imports always come last, this helps to avoid CSS order issues
						['^.+\\.(module.css|module.scss)$'],
						// 6. media imports
						['^.+\\.(gif|png|svg|jpg)$'],
					],
				},
			],
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
]);
