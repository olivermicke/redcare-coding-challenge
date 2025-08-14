import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { ApiClient, ApiClientContext, GITHUB_API_BASE_URL } from '@/api';

type Props = { children: React.ReactNode };

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			gcTime: 1000 * 60 * 60 * 24, // 1 day
			staleTime: 1000 * 60 * 60, // 1 hour
		},
	},
});

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
});

export function AppProvider({ children }: Props) {
	const apiClient = new ApiClient(GITHUB_API_BASE_URL);

	return (
		<ApiClientContext.Provider value={{ apiClient }}>
			<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
				{children}
				{!import.meta.env.PROD && <ReactQueryDevtools initialIsOpen={false} />}
			</PersistQueryClientProvider>
		</ApiClientContext.Provider>
	);
}
