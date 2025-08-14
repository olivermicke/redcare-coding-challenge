type Props = { children: React.ReactNode };

export function InfoTextWrapper({ children }: Props) {
	return (
		<div className="p-4 border-t-1 border-gray-300 text-gray-700 leading-tight">{children}</div>
	);
}
