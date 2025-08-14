import type { GetReposOptions } from './types';

export const queryKeys = {
	repos: (options: GetReposOptions) => {
		return ['repos', options] as const;
	},
} as const;
