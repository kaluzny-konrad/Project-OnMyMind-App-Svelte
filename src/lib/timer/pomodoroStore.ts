import { v4 as uuidv4 } from 'uuid';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export default interface Pomodoro {
	id: string;
	isRunning: boolean;
	remainingTime: number;
}

const storageName = 'pomodoro';

const data: Pomodoro[] = browser
	? JSON.parse(window.localStorage.getItem(storageName) as string) ?? []
	: [];

export const pomodoros: Writable<Pomodoro[]> = writable(data);

pomodoros.subscribe((value: Pomodoro[]) => {
	if (browser) {
		localStorage.setItem(storageName, JSON.stringify(value));
	}
});

export const addPomodoroToStore = (maxTime: number): Pomodoro => {
	if (maxTime < 0) maxTime = 60;
	let pomodoro: Pomodoro = {
		id: uuidv4(),
		isRunning: false,
		remainingTime: maxTime,
	};

	pomodoros.update((currentPomodoros: Pomodoro[]) => {
		return [...currentPomodoros, pomodoro];
	});
	return pomodoro;
};

export const getPomodoroFromStore = (): Pomodoro | null => {
	let pomodoro: Pomodoro | null = null;
	pomodoros.subscribe((currentPomodoros: Pomodoro[]) => {
		pomodoro = currentPomodoros.find(() => true) as Pomodoro;
		if (pomodoro?.remainingTime < 0) {
			pomodoro.remainingTime = 0;
			pomodoro.isRunning = false;
		}
	});
	return pomodoro;
};

export const deletePomodoroFromStore = (id: string): void => {
	pomodoros.update((currentPomodoros: Pomodoro[]) => {
		return currentPomodoros.filter((pomodoro: Pomodoro) => pomodoro.id !== id);
	});
};

export const startPomodoroInStore = (id: string): void => {
	pomodoros.update((pomodoros) => {
		pomodoros.forEach((pomodoro) => (pomodoro.isRunning = false));
		const pomodoro = pomodoros.find((pomodoro) => pomodoro.id === id);
		if (!pomodoro) return pomodoros;
		pomodoro.isRunning = true;
		return pomodoros;
	});
};

export const stopPomodoroInStore = (id: string): void => {
	pomodoros.update((pomodoros) => {
		const pomodoro = pomodoros.find((pomodoro) => pomodoro.id === id);
		if (!pomodoro) return pomodoros;
		pomodoro.isRunning = false;
		return pomodoros;
	});
};

export const updatePomodoroTimeInStore = (): void => {
	pomodoros.update((pomodoros) => {
		pomodoros.forEach((pomodoro) => {
			if (pomodoro.isRunning) {
				if (pomodoro.remainingTime === 1) pomodoro.isRunning = false;
				pomodoro.remainingTime -= 1;
				if (pomodoro.remainingTime < 0) {
					pomodoro.remainingTime = 0;
					pomodoro.isRunning = false;
				}
			}
		});
		return pomodoros;
	});
};

setInterval(updatePomodoroTimeInStore, 1000);
