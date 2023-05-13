import Privacy from './Privacy.svelte';
import { render, screen } from '@testing-library/svelte';

describe('Privacy', () => {
	beforeEach(() => {
		render(Privacy);
	});

	it('should have h1 Privacy Policy', () => {
		expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
	});
});
