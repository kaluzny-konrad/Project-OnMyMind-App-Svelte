import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Timer from './Timer.svelte';

describe('Timer Component', () => {
	it('renders the component with standard value', () => {
		render(Timer);
		expect(screen.getByText('00:00')).toBeInTheDocument();
	});
});
