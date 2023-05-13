import Terms from './Terms.svelte';
import { render, screen } from '@testing-library/svelte';

describe('Terms', () => {
	beforeEach(() => {
		render(Terms);
	});

	it('should have h1 Terms and Conditions', () => {
		expect(screen.getByText('Terms and Conditions')).toBeInTheDocument();
	});
});
