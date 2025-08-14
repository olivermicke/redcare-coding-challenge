import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ApiClient, ApiClientContext, GITHUB_API_BASE_URL } from './api';

type Props = { children: React.ReactNode };

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 900_000, // 15min
		},
	},
});

export function AppProvider({ children }: Props) {
	const apiClient = new ApiClient(GITHUB_API_BASE_URL);

	return (
		<ApiClientContext.Provider value={{ apiClient }}>
			<QueryClientProvider client={queryClient}>
				{children}
				{!import.meta.env.PROD && <ReactQueryDevtools initialIsOpen={false} />}
			</QueryClientProvider>
		</ApiClientContext.Provider>
	);
}
