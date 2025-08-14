// Get date one week ago formatted like this: "2025-08-14"
export function getOneWeekAgoFormattedDate(): string {
	const date = new Date();
	date.setDate(date.getDate() - 7);
	const formattedDate = date.toISOString().split('T')[0];

	return formattedDate;
}

// Reference: https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml
export function getHexCodeForLanguage(language: string): string {
	switch (language) {
		case 'Python': {
			return '#3572A5';
		}
		case 'JavaScript': {
			return '#f1e05a';
		}
		case 'TypeScript': {
			return '#3178c6';
		}
		case 'Java': {
			return '#b07219';
		}
		case 'C': {
			return '#555555';
		}
		case 'C++': {
			return '#f34b7d';
		}
		case 'C#': {
			return '#178600';
		}
		case 'Go': {
			return '#00ADD8';
		}
		case 'Rust': {
			return '#dea584';
		}
		case 'Ruby': {
			return '#701516';
		}
		case 'PHP': {
			return '#4F5D95';
		}
		case 'HTML': {
			return '#e34c26';
		}
		case 'CSS': {
			return '#563d7c';
		}
		case 'Kotlin': {
			return '#A97BFF';
		}
		case 'Swift': {
			return '#F05138';
		}
		case 'Shell': {
			return '#89e051';
		}
		case 'SQL': {
			return '#e38c00';
		}
		case 'R': {
			return '#198CE7';
		}
		case 'Perl': {
			return '#0298c3';
		}
		case 'Scala': {
			return '#c22d40';
		}
		default: {
			return '#364153';
		}
	}
}
