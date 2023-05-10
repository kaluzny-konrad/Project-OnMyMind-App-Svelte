import sgMail from '@sendgrid/mail';

let lastSent = 0;
const cooldown = 1000 * 1; // 1 second

sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

export async function POST({ request }) {
	const now = Date.now();
	if (now - lastSent < cooldown) {
		return new Response(false);
	}
	lastSent = now;

	const { email, message } = await request.json();
	const msg = {
		to: import.meta.env.VITE_EMAIL_ADDRESS,
		from: import.meta.env.VITE_EMAIL_ADDRESS,
		subject: 'New message from your site',
		text: `Mail: ${email}. Message: ${message}`,
	};

	try {
		await sgMail.send(msg);
		return new Response(true);
	} catch (error) {
		console.error(error);
		return new Response(false);
	}
}
