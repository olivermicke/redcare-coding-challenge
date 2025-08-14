import { z } from 'zod';

import type { repoSchema } from './schemas';

export type GetReposOptions = {
	createdAfter: string;
	order: 'desc';
	sort: 'stars';
};

export type Repo = z.infer<typeof repoSchema>;
