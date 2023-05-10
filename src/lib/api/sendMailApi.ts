// @ts-nocheck
export const apiUrl = '/api/send-email';

let lastSent = 0;
const cooldown = 1000 * 5; // 5 seconds

export default async function httpPost(email, message) {
	const now = Date.now();
	if (now - lastSent < cooldown) {
		return {
			status: 'error',
			message: 'Too many requests. Please try again later.',
		};
	}
	lastSent = now;

	let data = { email, message };
	const res = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: data && JSON.stringify(data),
	});
	const isSuccess = (await res.json()) as Boolean;
	if (isSuccess)
		return {
			status: 'success',
			message: '',
		};
	return {
		status: 'error',
		message: 'Something went wrong. Please try again later.',
	};
}
