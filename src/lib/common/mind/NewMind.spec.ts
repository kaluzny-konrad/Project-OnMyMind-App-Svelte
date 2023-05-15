import { render, screen, fireEvent } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import { addMindToStore } from '../../stores/mindStore';
import { addTimerToStore, startTimerInStore } from '../../stores/timerStore';
import NewMind from './NewMind.svelte';

const mockedMindId = '123';

jest.mock('../../stores/mindStore', () => ({
	addMindToStore: jest.fn(() => mockedMindId),
}));

jest.mock('../../stores/timerStore', () => ({
	addTimerToStore: jest.fn(),
	startTimerInStore: jest.fn(),
}));

describe('NewMind Component', () => {
	beforeEach(() => {
		(addMindToStore as jest.Mock).mockClear();
		(addTimerToStore as jest.Mock).mockClear();
		(startTimerInStore as jest.Mock).mockClear();
	});

	it('renders the component with input and add button', () => {
		render(NewMind);

		expect(screen.getByTestId('add-task')).toBeInTheDocument();
		expect(screen.getByTestId('mind-input')).toBeInTheDocument();
	});

	it('adds a new mind on button click', async () => {
		render(NewMind);

		const mindInput = screen.getByTestId('mind-input') as HTMLInputElement;
		const addButton = screen.getByTestId('add-task');

		const mindName = 'Test Mind';
		mindInput.value = mindName;

		await fireEvent.click(addButton);

		expect(addMindToStore).toHaveBeenCalledWith(mindName);
		expect(addTimerToStore).toHaveBeenCalledWith(mockedMindId);
		expect(startTimerInStore).toHaveBeenCalledWith(mockedMindId);

		expect(mindInput.value).toBe('');
	});

	it('adds a new mind on pressing Enter', async () => {
		render(NewMind);

		const mindInput = screen.getByTestId('mind-input') as HTMLInputElement;

		const mindName = 'Test Mind';
		mindInput.value = mindName;

		await fireEvent.keyDown(mindInput, { key: 'Enter' });

		expect(addMindToStore).toHaveBeenCalledWith(mindName);
		expect(addTimerToStore).toHaveBeenCalledWith(mockedMindId);
		expect(startTimerInStore).toHaveBeenCalledWith(mockedMindId);

		expect(mindInput.value).toBe('');
	});

	it('does not add a new mind on pressing other keys', async () => {
		render(NewMind);

		const mindInput = screen.getByTestId('mind-input') as HTMLInputElement;

		const mindName = 'Test Mind';
		mindInput.value = mindName;

		await fireEvent.keyDown(mindInput, { key: 'a' });

		expect(addMindToStore).not.toHaveBeenCalledWith(mindName);
		expect(addTimerToStore).not.toHaveBeenCalledWith(mockedMindId);
		expect(startTimerInStore).not.toHaveBeenCalledWith(mockedMindId);

		expect(mindInput.value).toBe(mindName);
	});
});
