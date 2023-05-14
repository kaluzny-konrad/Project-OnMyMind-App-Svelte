import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import PomodoroTimer from './PomodoroTimer.svelte';

describe('PomodoroTimer Component', () => {
	it('renders the component with standard value', () => {
		render(PomodoroTimer);
		expect(screen.getByText('15:00')).toBeInTheDocument();
	});
});
