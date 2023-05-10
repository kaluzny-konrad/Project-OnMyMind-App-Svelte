import sgMail from '@sendgrid/mail';

sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

export async function GET() {
	return {
		status: 200,
		body: { success: true },
	};
}

export async function POST(request) {
	const { email, message } = request.body;
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
