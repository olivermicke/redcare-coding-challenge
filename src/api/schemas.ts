import z from 'zod';

export const repoDtoSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().nullable(),
	owner: z.object({ login: z.string() }),
	html_url: z.string(),
	stargazers_count: z.number(),
	forks_count: z.number(),
	watchers_count: z.number(),
	language: z.string().nullable().catch(null),
});
