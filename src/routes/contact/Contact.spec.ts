import Contact from './Contact.svelte';
import { render, screen } from '@testing-library/svelte';

describe('Contact', () => {
	beforeEach(() => {
		render(Contact);
	});

	it('should have h1 Contact', () => {
		expect(screen.getByText('Contact')).toBeInTheDocument();
	});
});
