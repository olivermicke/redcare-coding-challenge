import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
	component: () => (
		<>
			<nav aria-label="Main">
				<ul className="p-2 flex gap-2">
					<li>
						<Link to="/" className="[&.active]:font-bold">
							Discover
						</Link>{' '}
					</li>
					<li>
						<Link to="/starred" className="[&.active]:font-bold">
							Starred
						</Link>
					</li>
				</ul>
			</nav>
			<hr aria-hidden />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
