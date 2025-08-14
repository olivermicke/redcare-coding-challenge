import { MainNavigationLink } from './main-navigation-link';

export function MainNavigation() {
	return (
		<nav className="mt-10">
			<div className="py-6 px-4 bg-gray-50 border-1 border-b-0 rounded-t-xl border-gray-300 text-xs">
				<MainNavigationLink to="/" className="rounded-l-md">
					Discover
				</MainNavigationLink>
				<MainNavigationLink to="/starred" className="rounded-r-md">
					Starred
				</MainNavigationLink>
			</div>
		</nav>
	);
}
