import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import {
	toggleCompleteInStore,
	addMindToStore,
	minds,
} from '../../../stores/mindStore';

import ReopenMindButton from './ReopenMindButton.svelte';
import type Mind from '../../../types/Mind';

describe('ReopenMindButton Component', () => {
	const mindName = 'test';
	let mindId: string;
	let mind: Mind;

	beforeEach(() => {
		minds.set([]);
		mindId = addMindToStore(mindName);
		toggleCompleteInStore(mindId);
		subscribeMind();
	});

	function subscribeMind(): void {
		minds.subscribe((value: Mind[]) => {
			mind = value.find((mind: Mind) => mind.id === mindId) as Mind;
		});
	}

	it('renders the component with reopen button', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		render(ReopenMindButton as any, { mind });

		expect(screen.getByTestId('reopen-task')).toBeInTheDocument();
	});

	it('calls toggleCompleteInStore on button click', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		render(ReopenMindButton as any, { mind });
		expect(mind.isComplete).toBe(true);

		const reopenButton = screen.getByTestId('reopen-task');

		await fireEvent.click(reopenButton);

		expect(mind.isComplete).toBe(false);
	});
});
