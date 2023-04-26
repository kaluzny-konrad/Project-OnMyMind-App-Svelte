import { v4 as uuidv4 } from 'uuid';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export default interface Timer {
	id: string;
	isRunning: boolean;
	time: number;
}

const storageName = 'timers-list';

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

export const addTimerToStore = (): Timer => {
	let timer: Timer = {
		id: uuidv4(),
		isRunning: false,
		time: 0,
	};
	timers.update((currentTimers: Timer[]) => {
		return [...currentTimers, timer];
	});
	return timer;
};

export const deleteTimerFromStore = (id: string): void => {
	timers.update((currentTimers: Timer[]) => {
		return currentTimers.filter(
			(timer: Timer) => timer.id !== id,
		);
	});
};

export const startTimerInStore = (id: string): void => {
	timers.update((timers) => {
		timers.forEach((timer) => (timer.isRunning = false));
		const timer = timers.find((timer) => timer.id === id);
		if (!timer) return timers;
		timer.isRunning = true;
		return timers;
	});
};

export const stopTimerInStore = (id: string): void => {
	timers.update((timers) => {
		const timer = timers.find((timer) => timer.id === id);
		if (!timer) return timers;
		timer.isRunning = false;
		return timers;
	});
};

export const tickTimeInStore = (id: string): void => {
	timers.update((timers) => {
		const timer = timers.find((timer) => timer.id === id);
		if (!timer) return timers;
		timer.time++;
		return timers;
	});
};
