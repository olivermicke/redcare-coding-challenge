import { createFileRoute } from '@tanstack/react-router';

import { RepoDiscoveryView } from '@/views/repo-discovery';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	return <RepoDiscoveryView />;
}
