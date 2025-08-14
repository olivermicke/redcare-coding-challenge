import { Link, type LinkProps } from '@tanstack/react-router';

type Props = {
	children: React.ReactNode;
	className: string;
	to: LinkProps['to'];
};

export function MainNavigationLink({ children, className, to }: Props) {
	return (
		<Link
			to={to}
			className={`py-2 px-4 border-1 ${className} font-medium [&.active]:bg-blue-600 border-gray-300 [&.active]:border-blue-600  text-gray-700 [&.active]:text-white`}
		>
			{children}
		</Link>
	);
}
