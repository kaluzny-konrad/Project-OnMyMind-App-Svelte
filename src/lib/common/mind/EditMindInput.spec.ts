import { fireEvent, render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import {
	addMindToStore,
	minds,
	changeMindNameInStore,
} from '../../stores/mindStore';
import type Mind from '../../types/Mind';

import EditMindInput from './EditMindInput.svelte';

jest.mock('../../stores/mindStore', () => ({
	...jest.requireActual('../../stores/mindStore'),
	changeMindNameInStore: jest.fn(),
}));

describe('EditMindInput Component', () => {
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
		render(EditMindInput, { mind: mind });
		expect(screen.getByTestId('edit-task')).toBeInTheDocument();
	});

	it('triggers the change of mind name', async () => {
		render(EditMindInput, { mind: mind });
		expect(mind.name).toBe(mindName);
		const expectedName = 'new name';

		const input = screen.getByTestId('edit-task') as HTMLInputElement;

		await fireEvent.input(input, {
			target: { value: expectedName },
		});

		expect(changeMindNameInStore).toHaveBeenCalledWith(mind.id, expectedName);

		expect(mind.name).toBe(expectedName);
	});
});
