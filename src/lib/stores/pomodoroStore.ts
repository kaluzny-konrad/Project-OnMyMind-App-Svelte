import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import Pomodoro from '../types/Pomodoro';

const storageName = 'pomodoro';

const data: Pomodoro[] = browser
	? JSON.parse(window.localStorage.getItem(storageName) as string) ?? []
	: [];

export const pomodoros: Writable<Pomodoro[]> = writable(
	data.map((pomodoro) => {
		const correctPomodoro = new Pomodoro(pomodoro.maxTime);
		correctPomodoro.isRunning = pomodoro.isRunning;
		correctPomodoro.startTime = pomodoro.startTime;
		correctPomodoro.beforeElapsedTime = pomodoro.beforeElapsedTime;
		return correctPomodoro;
	}),
);

pomodoros.subscribe((value: Pomodoro[]) => {
	if (browser) {
		localStorage.setItem(storageName, JSON.stringify(value));
	}
});

export const addPomodoroToStore = (maxTime: number): Pomodoro => {
	if (maxTime < 0) maxTime = 60 * 1000;
	const pomodoro: Pomodoro = new Pomodoro(maxTime);

	pomodoros.update((currentPomodoros: Pomodoro[]) => {
		return [...currentPomodoros, pomodoro];
	});
	return pomodoro;
};

export const getPomodoroFromStore = (): Pomodoro | null => {
	let pomodoro: Pomodoro | null = null;
	pomodoros.subscribe((currentPomodoros: Pomodoro[]) => {
		pomodoro = currentPomodoros.find(() => true) as Pomodoro;
	});
	if (pomodoro) return pomodoro;
	return null;
};

export const deletePomodoroFromStore = (): void => {
	pomodoros.update((currentPomodoros: Pomodoro[]) => {
		return currentPomodoros.filter(() => false);
	});
};

export const startPomodoroInStore = (): void => {
	pomodoros.update((pomodoros) => {
		pomodoros.find(() => true)?.start();
		return pomodoros;
	});
};

export const stopPomodoroInStore = (): void => {
	pomodoros.update((pomodoros) => {
		pomodoros.find(() => true)?.stop();
		return pomodoros;
	});
};
