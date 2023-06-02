import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import { addMindToStore, minds } from '../../../stores/mindStore';
import type Mind from '../../../types/Mind';
import {
	timers,
	addTimerToStore,
	startTimerInStore,
} from '../../../stores/timerStore';

import DeleteMindButton from './DeleteMindButton.svelte';
import type MindTimer from '$lib/types/MindTimer';

describe('DeleteMindButton Component', () => {
	const mindName = 'test';
	let mindId: string;
	let mind: Mind;
	let timer: MindTimer;

	beforeEach(() => {
		minds.set([]);
		mindId = addMindToStore(mindName);
		subscribeMind();

		timers.set([]);
		timer = addTimerToStore(mind.id);
		subscribeTimer();
		startTimerInStore(mind.id);
	});

	function subscribeMind(): void {
		minds.subscribe((value: Mind[]) => {
			mind = value.find((mind: Mind) => mind.id === mindId) as Mind;
		});
	}

	function subscribeTimer(): void {
		timers.subscribe((value: MindTimer[]) => {
			timer = value.find(
				(timer: MindTimer) => timer.mindId === mindId,
			) as MindTimer;
		});
	}

	it('renders the component with standard value', () => {
		render(DeleteMindButton, { mind: mind });
		expect(screen.getByTestId('delete-task')).toBeInTheDocument();
	});

	it('triggers the delete event', async () => {
		render(DeleteMindButton, { mind: mind });
		const button = screen.getByTestId('delete-task');

		expect(mind).not.toBe(undefined);
		button.click();

		expect(mind).toBe(undefined);
	});

	it('stops timmer when delete', async () => {
		expect(timer.isRunning).toBe(true);

		render(DeleteMindButton, { mind: mind });
		const button = screen.getByTestId('delete-task');

		button.click();

		expect(timer).toBe(undefined);
	});
});
