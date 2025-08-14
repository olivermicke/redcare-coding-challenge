import { RepoList } from '@/components/repo-list';

export function StarredReposView() {
	return (
		<>
			<RepoList
				ariaLabel="Starred Trending Repos"
				emptyState={<p>No repos starred yet.</p>}
				filters={{ starredOnly: true }}
			/>
		</>
	);
}
