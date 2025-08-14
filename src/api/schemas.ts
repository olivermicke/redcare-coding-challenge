import z from 'zod';

export const repoSchema = z.object({
	id: z.number(),
	name: z.string(),
	full_name: z.string(),
});
