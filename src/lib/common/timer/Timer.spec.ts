import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Timer from './Timer.svelte';

describe('Timer Component', () => {
	it('renders the component with standard value', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		render(Timer as any, { mindId: 'test', active: false });
		expect(screen.getByText('00:00')).toBeInTheDocument();
	});
});
