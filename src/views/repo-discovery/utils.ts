// Get date one week ago formatted like this: "2025-08-14"
export function getOneWeekAgoFormattedDate(): string {
	const date = new Date();
	date.setDate(date.getDate() - 7);
	const formattedDate = date.toISOString().split('T')[0];

	return formattedDate;
}
