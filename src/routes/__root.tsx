import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { MainNavigation } from '@/components/main-navigation';

export const Route = createRootRoute({
	component: () => (
		<div className="py-6">
			<div className="py-6 text-center border-1 border-l-0 border-r-0 border-gray-300 bg-gray-50">
				<h1 className="text-3xl text-gray-900 font-semibold leading-tight">Trending</h1>
				<p className="text-lg text-gray-500 leading-tight">
					See which new GitHub repos everyone’s excited about this week.
				</p>
			</div>

			<div className="mx-auto max-w-3xl">
				<MainNavigation />

				<main>
					<Outlet />
				</main>
			</div>

			{!import.meta.env.PROD && <TanStackRouterDevtools />}
		</div>
	),
});
