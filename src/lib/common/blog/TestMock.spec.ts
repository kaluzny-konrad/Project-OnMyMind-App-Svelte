import { fireEvent, render, waitFor, screen } from '@testing-library/svelte';
import Component from './TestMock.svelte';

describe('Component', () => {
	it('should render "Mounted!" when mounted', async () => {
		render(Component);

		await waitFor(async () => {
			expect(screen.getByTestId('isMounted')).toBeInTheDocument();
			expect(screen.getByTestId('isMounted')).toHaveTextContent('1');
		});
	});

	it('should render "Not mounted!" when not mounted', () => {
		render(Component);
		expect(screen.getByTestId('isMounted')).toBeInTheDocument();
		expect(screen.getByTestId('isMounted')).toHaveTextContent('0');
	});
});
