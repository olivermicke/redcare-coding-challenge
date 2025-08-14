type Props = { children: React.ReactNode };

export const AriaLiveWrapper = ({ children }: Props) => {
	return <div aria-live="polite">{children}</div>;
};
