import { z } from 'zod';

import type { repoDtoSchema } from './schemas';

export type GetReposOptions = {
	createdAfter: string;
	order: 'desc';
	sort: 'stars';
};

export type RepoDto = z.infer<typeof repoDtoSchema>;

export type Repo = {
	id: number;
	name: string;
	owner: string;
	externalLink: string;
	isStarred: boolean;
	description: string | null;
	starsCount: number;
	forksCount: number;
	watchersCount: number;
	language: string | null;
};
