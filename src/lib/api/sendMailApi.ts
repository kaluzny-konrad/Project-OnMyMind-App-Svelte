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

	let mailContent;

	const emailRegex =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

	if (!emailRegex.test(email)) {
		return {
			status: 'error',
			message: 'Provided e-mail is not correct.',
		};
	}
	mailContent = `E-mail: ${email}\n Message:\n${message}`;

	let data = { mailContent };

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
