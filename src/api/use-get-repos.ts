import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useApiClient } from './api-client.context';
import { queryKeys } from './query-keys';
import type { GetReposOptions, Repo, RepoDto } from './types';

function mapDto(repoDto: RepoDto): Repo {
	return {
		id: repoDto.id,
		name: repoDto.name,
		owner: repoDto.owner.login,
		externalLink: repoDto.html_url,
		description: repoDto.description,
		starsCount: repoDto.stargazers_count,
		forksCount: repoDto.forks_count,
		watchersCount: repoDto.watchers_count,
		language: repoDto.language,
		isStarred: false,
	};
}

type Props = {
	options: GetReposOptions;
};

export function useGetRepos({ options }: Props) {
	const queryClient = useQueryClient();

	const { apiClient } = useApiClient();

	const { data, isLoading, isError } = useQuery({
		queryKey: queryKeys.repos(options),
		queryFn: async () => {
			const repoDtos = await apiClient.getRepos(options);
			const mappedRepos = repoDtos.map(mapDto);

			return mappedRepos;
		},
	});

	const toggleIsStarred = useCallback(
		(repoId: number): void => {
			const queryKey = queryKeys.repos(options);

			const currentData = queryClient.getQueryData<Repo[]>(queryKey);

			if (!currentData) {
				console.info('No data found.');
				return;
			}

			const updatedData = currentData.map((repo) => {
				if (repo.id !== repoId) {
					return repo;
				}

				return {
					...repo,
					isStarred: !repo.isStarred,
				};
			});

			queryClient.setQueryData(queryKey, updatedData);
		},
		[queryClient, options],
	);

	return {
		repos: data,
		isLoading,
		isError,
		toggleIsStarred,
	};
}
