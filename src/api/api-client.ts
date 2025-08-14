import z from 'zod';

import { repoSchema } from './schemas';
import { type GetReposOptions, type Repo } from './types';

export interface IApiClient {
	getRepos: (options: GetReposOptions) => Promise<Repo[]>;
}

export class ApiClient implements IApiClient {
	constructor(private readonly baseUrl: string) {}

	async getRepos(options: GetReposOptions) {
		const searchQuery = `created:>${options.createdAfter}`;

		const url = new URL('/search/repositories', this.baseUrl);
		url.searchParams.set('q', searchQuery);
		url.searchParams.set('sort', options.sort);
		url.searchParams.set('order', options.order);

		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			if (!data?.items) {
				throw new Error('Empty items');
			}

			const repos = z.parse(repoSchema.array(), data.items);
			return repos;
		} catch (error) {
			console.error('Error fetching repositories:', error);
			throw error;
		}
	}
}
