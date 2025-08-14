import { useGetRepos } from '../../api';

import { getOneWeekAgoFormattedDate } from './utils';

const AriaLiveWrapper = ({ children }: { children: React.ReactNode }) => (
	<div aria-live="polite">{children}</div>
);

export function RepoDiscoveryView() {
	const { repos, isError, isLoading } = useGetRepos({
		options: {
			createdAfter: getOneWeekAgoFormattedDate(),
			order: 'desc',
			sort: 'stars',
		},
	});

	if (isLoading) {
		return (
			<AriaLiveWrapper>
				<p>Loading…</p>
			</AriaLiveWrapper>
		);
	}

	if (isError || !repos) {
		return (
			<AriaLiveWrapper>
				<p>Something went wrong. Please try again later.</p>
			</AriaLiveWrapper>
		);
	}

	return (
		<AriaLiveWrapper>
			<ul>
				{repos.map(({ id, name, full_name }) => {
					return (
						<li key={id}>
							<a href={`https://github.com/${full_name}`} target="_blank">
								{name}
							</a>
						</li>
					);
				})}
			</ul>
		</AriaLiveWrapper>
	);
}
