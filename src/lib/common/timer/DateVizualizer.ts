export function dateToShortString(data: Date) {
	const day = data.getDate().toString().padStart(2, '0');
	const month = (data.getMonth()).toString().padStart(2, '0');
	const hours = data.getHours().toString().padStart(2, '0');
	const minutes = data.getMinutes().toString().padStart(2, '0');

	return `${day}.${month} ${hours}:${minutes}`;
}
