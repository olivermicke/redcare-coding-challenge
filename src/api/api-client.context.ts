import { createContext, useContext } from 'react';

import type { IApiClient } from './api-client';

interface IApiClientContext {
	apiClient: IApiClient;
}

export const ApiClientContext = createContext<IApiClientContext>({
	apiClient: {
		getRepos: () => Promise.resolve([]),
	},
});

export const useApiClient = () => {
	const context = useContext(ApiClientContext);

	if (!context) {
		throw new Error('"useApiClient" must be used within "ApiClientContext"');
	}

	return context;
};
