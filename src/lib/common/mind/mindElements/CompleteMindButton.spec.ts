import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import CompleteMindButton from './CompleteMindButton.svelte';

import type Mind from '../../../types/Mind';
import { addMindToStore, minds } from '../../../stores/mindStore';
import {
	timers,
	addTimerToStore,
	startTimerInStore,
} from '../../../stores/timerStore';

describe('CompleteMindButton Component', () => {
	const mindName = 'test';
	let mindId: string;
	let mind: Mind;

	beforeEach(() => {
		minds.set([]);
		mindId = addMindToStore(mindName);
		subscribeMind();
	});

	function subscribeMind(): void {
		minds.subscribe((value: Mind[]) => {
			mind = value.find((mind: Mind) => mind.id === mindId) as Mind;
		});
	}

	it('renders the component with standard value', () => {
		render(CompleteMindButton, { mind: mind });
		expect(screen.getByTestId('complete-task')).toBeInTheDocument();
	});

	it('triggers the complete event', async () => {
		render(CompleteMindButton, { mind: mind });
		const button = screen.getByTestId('complete-task');

		button.click();

		expect(mind.isComplete).toBe(true);
	});

	it('stops timmer when complete', async () => {
		timers.set([]);
		const timer = addTimerToStore(mind.id);
		startTimerInStore(mind.id);
		expect(timer.isRunning).toBe(true);

		render(CompleteMindButton, { mind: mind });
		const button = screen.getByTestId('complete-task');

		button.click();

		expect(timer.isRunning).toBe(false);
	});
});
