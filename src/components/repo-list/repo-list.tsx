import { CircleIcon, EyeIcon, GitForkIcon, StarIcon } from 'lucide-react';

import { useGetRepos } from '@/api';

import { AriaLiveWrapper } from './aria-live-wrapper';
import { getHexCodeForLanguage, getOneWeekAgoFormattedDate } from './utils';
import { InfoTextWrapper } from './info-text-wrapper';

type Props = {
	ariaLabel: string;
	emptyState?: React.ReactNode;
	filters?: {
		starredOnly: boolean;
	};
};

export function RepoList({ ariaLabel, emptyState, filters }: Props) {
	const { repos, isError, isLoading, toggleIsStarred } = useGetRepos({
		options: {
			createdAfter: getOneWeekAgoFormattedDate(),
			order: 'desc',
			sort: 'stars',
		},
	});

	if (isLoading) {
		return (
			<AriaLiveWrapper>
				<InfoTextWrapper>
					<p>Loading…</p>
				</InfoTextWrapper>
			</AriaLiveWrapper>
		);
	}

	if (isError || !repos) {
		return (
			<AriaLiveWrapper>
				<InfoTextWrapper>
					<p>Something went wrong. Please try again later.</p>
				</InfoTextWrapper>
			</AriaLiveWrapper>
		);
	}

	const filteredRepos = filters?.starredOnly ? repos.filter((repo) => repo.isStarred) : repos;

	if (filteredRepos.length === 0) {
		return (
			<AriaLiveWrapper>
				<InfoTextWrapper>{emptyState}</InfoTextWrapper>
			</AriaLiveWrapper>
		);
	}

	return (
		<AriaLiveWrapper>
			<ul
				aria-label={ariaLabel}
				className="border rounded-b-lg border-gray-300 divide-y divide-gray-300"
			>
				{filteredRepos.map((repo) => {
					return (
						<li key={repo.id}>
							<article className="p-4">
								<div className="float-right">
									<button
										className="py-1 px-3 bg-gray-50 hover:bg-gray-100 border-1 rounded-lg border-gray-300 hover:border-gray-400 hover:cursor-pointer text-xs text-gray-900"
										onClick={() => {
											toggleIsStarred(repo.id);
										}}
									>
										<span className="flex gap-2 text-xs">
											<span className="flex items-center">
												<StarIcon
													aria-hidden
													className={`text-gray-700 ${repo.isStarred ? 'text-yellow-500 fill-yellow-500' : ''}`}
													size={16}
												/>
											</span>
											<span>{repo.isStarred ? <>Starred</> : <>Star</>}</span>
										</span>
									</button>
								</div>

								<h2>
									<a
										href={repo.externalLink}
										target="_blank"
										className="text-blue-600 text-xl leading-tight hover:underline"
									>
										<span>
											<span>{repo.owner}</span> &#47;{' '}
										</span>
										<span className="font-semibold">{repo.name}</span>
									</a>
								</h2>

								<p className="pr-30 text-gray-500 text-sm leading-tight">{repo.description}</p>

								<div className="mt-2 flex gap-4">
									{repo.language && (
										<span className="text-gray-500 flex items-center gap-1" title="Stars">
											<CircleIcon
												aria-hidden
												fill={getHexCodeForLanguage(repo.language)}
												stroke={getHexCodeForLanguage(repo.language)}
												size={14}
											/>
											<span className="text-xs">{repo.language}</span>
										</span>
									)}

									<span className="text-gray-500 flex items-center gap-1" title="Stars">
										<StarIcon aria-hidden size={14} />
										<span className="text-xs">
											{new Intl.NumberFormat('en-US').format(repo.starsCount)}
										</span>
									</span>

									<span className="text-gray-500 flex items-center gap-1" title="Forks">
										<GitForkIcon aria-hidden size={14} />
										<span className="text-xs">
											{new Intl.NumberFormat('en-US').format(repo.forksCount)}
										</span>
									</span>

									<span className="text-gray-500 flex items-center gap-1" title="Watchers">
										<EyeIcon aria-hidden size={14} />
										<span className="text-xs">
											{new Intl.NumberFormat('en-US').format(repo.watchersCount)}
										</span>
									</span>
								</div>
							</article>
						</li>
					);
				})}
			</ul>
		</AriaLiveWrapper>
	);
}
