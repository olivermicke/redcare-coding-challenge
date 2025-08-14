import { useQuery } from '@tanstack/react-query';

import { useApiClient } from './api-client.context';
import { queryKeys } from './query-keys';
import type { GetReposOptions } from './types';

type Props = {
	options: GetReposOptions;
};

export function useGetRepos({ options }: Props) {
	const { apiClient } = useApiClient();

	const { data, isLoading, isError } = useQuery({
		queryKey: queryKeys.repos(options),
		queryFn: () => {
			return apiClient.getRepos(options);
		},
	});

	return {
		repos: data,
		isLoading,
		isError,
	};
}
