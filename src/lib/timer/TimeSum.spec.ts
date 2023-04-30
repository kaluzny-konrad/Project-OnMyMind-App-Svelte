import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import TimeSum from './TimeSum.svelte';

describe('Timer Component', () => {
	it('renders the component with standard value', () => {
		render(TimeSum);
		expect(screen.getByText('00:00')).toBeInTheDocument();
	});
});
