import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';

import { ApiClientContext, type RepoDto } from '@/api';
import { TestAppProvider } from '@/test-utils/test-app-provider';

import { RepoDiscoveryView } from './repo-discovery.view';

describe('RepoDiscoveryView', () => {
	it('should display loading state initially', () => {
		render(
			<TestAppProvider>
				<ApiClientContext.Provider
					value={{
						apiClient: {
							getRepos: () => {
								return Promise.resolve([] satisfies RepoDto[]);
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

	it('should display repo information', async () => {
		render(
			<TestAppProvider>
				<ApiClientContext.Provider
					value={{
						apiClient: {
							getRepos: () => {
								return Promise.resolve([
									{
										id: 12345,
										name: 'marder',
										description:
											'Simple tree-walk interpreter written for educational purposes. Shout-out to Robert Nystrom for his amazing book Crafting Interpreters.',
										owner: { login: 'olivermicke' },
										html_url: 'https://github.com/olivermicke/marder',
										stargazers_count: 1500,
										forks_count: 20,
										watchers_count: 30,
										language: 'TypeScript',
									},
								] satisfies RepoDto[]);
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
		expect(
			screen.getByText(
				'Simple tree-walk interpreter written for educational purposes. Shout-out to Robert Nystrom for his amazing book Crafting Interpreters.',
			),
		).toBeInTheDocument();
		expect(screen.getByText('1,500')).toBeInTheDocument();
		expect(screen.getByText('20')).toBeInTheDocument();
		expect(screen.getByText('30')).toBeInTheDocument();
		expect(screen.getByText('TypeScript')).toBeInTheDocument();
	});

	it('should display multiple repos', async () => {
		render(
			<TestAppProvider>
				<ApiClientContext.Provider
					value={{
						apiClient: {
							getRepos: () => {
								return Promise.resolve([
									{
										id: 12345,
										name: 'marder',
										description:
											'Simple tree-walk interpreter written for educational purposes. Shout-out to Robert Nystrom for his amazing book Crafting Interpreters.',
										owner: { login: 'olivermicke' },
										html_url: 'https://github.com/olivermicke/marder',
										stargazers_count: 100,
										forks_count: 20,
										watchers_count: 30,
										language: 'TypeScript',
									},
									{
										id: 67890,
										name: 'your-best-of-spotify',
										description: null,
										owner: { login: 'olivermicke' },
										html_url: 'https://github.com/olivermicke/your-best-of-spotify',
										stargazers_count: 30,
										forks_count: 220,
										watchers_count: 5930,
										language: null,
									},
								] satisfies RepoDto[]);
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

	it('should toggle star button when clicked', async () => {
		const user = userEvent.setup();

		render(
			<TestAppProvider>
				<ApiClientContext.Provider
					value={{
						apiClient: {
							getRepos: () => {
								return Promise.resolve([
									{
										id: 12345,
										name: 'test-repo',
										description: 'Test repository',
										owner: { login: 'testuser' },
										html_url: 'https://github.com/testuser/test-repo',
										stargazers_count: 100,
										forks_count: 5,
										watchers_count: 10,
										language: 'JavaScript',
									},
								] satisfies RepoDto[]);
							},
						},
					}}
				>
					<RepoDiscoveryView />
				</ApiClientContext.Provider>
			</TestAppProvider>,
		);

		await screen.findByText('test-repo');

		const starButton = screen.getByRole('button', { name: /star/i });
		expect(starButton).toHaveTextContent('Star');

		await user.click(starButton);
		expect(starButton).toHaveTextContent('Starred');
	});
});
