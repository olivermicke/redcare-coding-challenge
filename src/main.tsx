import { StrictMode } from 'react';
import { createHashHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { AppProvider } from './app-provider';
import { routeTree } from './routeTree.gen';

// Needed for GitHub Pages.
const hashHistory = createHashHistory();

const router = createRouter({
	routeTree,
	history: hashHistory,
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</StrictMode>,
	);
}
