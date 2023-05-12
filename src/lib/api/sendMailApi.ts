export const apiUrl = '/api/send-email';

let lastSent = 0;
const cooldown = 1000 * 5; // 5 seconds

export default async function httpPost(email: string, message: string) {
	const now = Date.now();
	if (now - lastSent < cooldown) {
		return {
			status: 'error',
			message: 'Too many requests. Please try again later.',
		};
	}
	lastSent = now;

	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	if (!emailRegex.test(email)) {
		return {
			status: 'error',
			message: 'Provided e-mail is not correct.',
		};
	}
	const mailContent = `E-mail: ${email}\n Message:\n${message}`;

	const data = { mailContent };

	const res = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: data && JSON.stringify(data),
	});
	const isSuccess = (await res.json()) as boolean;
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
