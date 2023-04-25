import { v4 as uuidv4 } from 'uuid';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Timer {
	id: string;
	isRunning: boolean;
	remainingTime: number;
}

const storageName = 'timer-list';

const data: Timer[] = browser
	? JSON.parse(
			window.localStorage.getItem(storageName) as string,
	  ) ?? []
	: [];

export const timers: Writable<Timer[]> = writable(data);

timers.subscribe((value: Timer[]) => {
	if (browser) {
		localStorage.setItem(
			storageName,
			JSON.stringify(value),
		);
	}
});

export const addTimerToStore = (
	remainingTime: number,
): void => {
	timers.update((currentTimers: Timer[]) => {
		return [
			...currentTimers,
			{
				id: uuidv4(),
				isRunning: false,
				remainingTime: remainingTime,
			},
		];
	});
};

export const deleteTimerFromStore = (id: string): void => {
	timers.update((currentTimers: Timer[]) => {
		return currentTimers.filter(
			(timer: Timer) => timer.id !== id,
		);
	});
};

export const toggleTimerInStore = (id: string): void => {
	timers.update((currentTimers: Timer[]) => {
		const timerToToggle = currentTimers.find(
			(timer: Timer) => timer.id === id,
		);
		if (!timerToToggle) return currentTimers;
		const updatedTimers = currentTimers.filter(
			(timer: Timer) => timer.id !== id,
		);
		if (timerToToggle.isRunning) {
			updatedTimers.unshift({
				...timerToToggle,
				isRunning: false,
			});
		} else {
			updatedTimers.push({
				...timerToToggle,
				isRunning: true,
			});
		}
		return updatedTimers;
	});
};

export const updateTimerInStore = (
	id: string,
	remainingTime: number,
): void => {
	timers.update((currentTimers: Timer[]) => {
		return currentTimers.map((timer: Timer) => {
			if (timer.id === id) {
				return {
					...timer,
					remainingTime: remainingTime,
				};
			}
			return timer;
		});
	});
};
