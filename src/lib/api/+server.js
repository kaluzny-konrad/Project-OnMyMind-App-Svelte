import sgMail from '@sendgrid/mail';

sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

export default async function POST(email, message) {
	const msg = {
		to: import.meta.env.VITE_EMAIL_ADDRESS,
		from: import.meta.env.VITE_EMAIL_ADDRESS,
		subject: 'New message from your site',
		text: `Mail: ${email}. Message: ${message}`,
	};

	try {
		await sgMail.send(msg);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}
