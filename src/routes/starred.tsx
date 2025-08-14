import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/starred')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/starred"!</div>;
}
