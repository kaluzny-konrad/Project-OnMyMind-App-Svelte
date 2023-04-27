import { describe, it, expect, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/svelte';
import PomodoroTimer from './PomodoroTimer.svelte';

describe('PomodoroTimer', () => {
	afterEach(cleanup);

	it('should start the pomodoro when start button is clicked', async () => {
		const { getByTestId } = render(PomodoroTimer);
		const startButton = getByTestId('start-button');

		await fireEvent.click(startButton);

		// Sprawdź, czy funkcja startPomodoroInStore została wywołana
		// Oczekiwane działanie: expect(/* mock function for startPomodoroInStore to be called */).toHaveBeenCalled();

		// Sprawdź, czy funkcja refreshPomodoro została wywołana
		// Oczekiwane działanie: expect(/* mock function for refreshPomodoro to be called */).toHaveBeenCalled();
	});

	it('should pause the pomodoro when pause button is clicked', async () => {
		const { getByTestId } = render(PomodoroTimer);
		const pauseButton = getByTestId('pause-button');

		await fireEvent.click(pauseButton);

		// Sprawdź, czy funkcja stopPomodoroInStore została wywołana
		// Oczekiwane działanie: expect(/* mock function for stopPomodoroInStore to be called */).toHaveBeenCalled();

		// Sprawdź, czy funkcja refreshPomodoro została wywołana
		// Oczekiwane działanie: expect(/* mock function for refreshPomodoro to be called */).toHaveBeenCalled();
	});

	it('should reset the pomodoro when reset button is clicked', async () => {
		const { getByTestId } = render(PomodoroTimer);
		const resetButton = getByTestId('reset-button');

		await fireEvent.click(resetButton);

		// Sprawdź, czy funkcja deletePomodoroFromStore została wywołana
		// Oczekiwane działanie: expect(/* mock function for deletePomodoroFromStore to be called */).toHaveBeenCalled();

		// Sprawdź, czy funkcja resetAudio została wywołana
		// Oczekiwane działanie: expect(/* mock function for resetAudio to be called */).toHaveBeenCalled();
	});
});
