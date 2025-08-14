import { createFileRoute } from '@tanstack/react-router';

import { StarredReposView } from '@/views/starred-repos';

export const Route = createFileRoute('/starred')({
	component: RouteComponent,
});

function RouteComponent() {
	return <StarredReposView />;
}
