import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ApiClientContext, type Repo } from '../../api';
import { TestAppProvider } from '../../test-utils/test-app-provider';

import { RepoDiscoveryView } from './repo-discovery.view';

describe('RepoDiscoveryView', () => {
	it('should display loading state initially', () => {
		render(
			<TestAppProvider>
				<ApiClientContext.Provider
					value={{
						apiClient: {
							getRepos: () => {
								return Promise.resolve([] satisfies Repo[]);
							},
						},
					}}
				>
					<RepoDiscoveryView />
				</ApiClientContext.Provider>
			</TestAppProvider>,
		);

		expect(screen.getByText('Loading…')).toBeInTheDocument();
	});

	it('should display repos', async () => {
		render(
			<TestAppProvider>
				<ApiClientContext.Provider
					value={{
						apiClient: {
							getRepos: () => {
								return Promise.resolve([
									{ id: 12345, name: 'marder', full_name: 'olivermicke/marder' },
									{
										id: 67890,
										name: 'your-best-of-spotify',
										full_name: 'olivermicke/your-best-of-spotify',
									},
								] satisfies Repo[]);
							},
						},
					}}
				>
					<RepoDiscoveryView />
				</ApiClientContext.Provider>
			</TestAppProvider>,
		);

		const marderRepo = await screen.findByText('marder');
		expect(marderRepo).toBeInTheDocument();

		const yourBestOfSpotifyRepo = await screen.findByText('your-best-of-spotify');
		expect(yourBestOfSpotifyRepo).toBeInTheDocument();
	});

	it('should handle error state', async () => {
		render(
			<TestAppProvider>
				<ApiClientContext.Provider
					value={{
						apiClient: {
							getRepos: () => {
								throw new Error('Error');
							},
						},
					}}
				>
					<RepoDiscoveryView />
				</ApiClientContext.Provider>
			</TestAppProvider>,
		);

		const errorMessage = await screen.findByText('Something went wrong. Please try again later.');
		expect(errorMessage).toBeInTheDocument();
	});
});
