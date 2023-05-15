import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import Timer from './Timer.svelte';

describe('Timer Component', () => {
	it('renders the component with standard value', () => {
		render(Timer, { mindId: 'test', active: false });
		expect(screen.getByText('00:00')).toBeInTheDocument();
	});
});
