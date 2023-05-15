import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import NewsletterForm from './NewsletterForm.svelte';

describe('NewsletterForm Component', () => {
	it('renders the component with the input field and submit button', () => {
		render(NewsletterForm);

		expect(screen.getByTestId('newsletter-input-email')).toBeInTheDocument();
		expect(screen.getByTestId('newsletter-submit')).toBeInTheDocument();
	});

	it('displays an error message if the email field is empty on submit', async () => {
		render(NewsletterForm);

		const subscribeButton = screen.getByTestId('newsletter-submit');

		await fireEvent.click(subscribeButton);

		expect(
			screen.getByText('* Email field cannot be empty'),
		).toBeInTheDocument();
	});

	it('submits the form when the email field is not empty', async () => {
		render(NewsletterForm);

		const emailInput = screen.getByTestId(
			'newsletter-input-email',
		) as HTMLInputElement;
		const subscribeButton = screen.getByTestId('newsletter-submit');

		await fireEvent.input(emailInput, {
			target: { value: 'test@example.com' },
		});
		await fireEvent.click(subscribeButton);

		expect(
			screen.queryByText('* Email field cannot be empty'),
		).not.toBeInTheDocument();
		expect(emailInput.value).toBe('');
	});
});
