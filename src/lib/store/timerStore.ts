import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export default interface Timer {
	mindId: string;
	isRunning: boolean;
	time: number;
}

const storageName = 'timers-list';

const data: Timer[] = browser
	? JSON.parse(window.localStorage.getItem(storageName) as string) ?? []
	: [];

export const timers: Writable<Timer[]> = writable(data);

timers.subscribe((value: Timer[]) => {
	if (browser) {
		localStorage.setItem(storageName, JSON.stringify(value));
	}
});

export const addTimerToStore = (mindId: string): Timer => {
	let timer: Timer = {
		mindId: mindId,
		isRunning: false,
		time: 0,
	};

	timers.update((currentTimers: Timer[]) => {
		return [...currentTimers, timer];
	});
	return timer;
};

export const getTimerFromStore = (mindId: string): Timer | null => {
	let timer: Timer | null = null;
	timers.subscribe((currentTimers: Timer[]) => {
		timer = currentTimers.find(
			(timer: Timer) => timer.mindId === mindId,
		) as Timer;
	});
	return timer;
};

export const deleteTimerFromStore = (mindId: string): void => {
	timers.update((currentTimers: Timer[]) => {
		return currentTimers.filter((timer: Timer) => timer.mindId !== mindId);
	});
};

export const startTimerInStore = (mindId: string): void => {
	timers.update((timers) => {
		timers.forEach((timer) => (timer.isRunning = false));
		const timer = timers.find((timer) => timer.mindId === mindId);
		if (!timer) return timers;
		timer.isRunning = true;
		return timers;
	});
};

export const stopTimerInStore = (mindId: string): void => {
	timers.update((timers) => {
		const timer = timers.find((timer) => timer.mindId === mindId);
		if (timer) timer.isRunning = false;
		return timers;
	});
};

export const updateTimerTimeInStore = (): void => {
	timers.update((timers) => {
		timers.forEach((timer) => {
			if (timer?.isRunning) timer.time = timer.time + 1;
		});
		return timers;
	});
};

setInterval(updateTimerTimeInStore, 1000);

export const getSumOfCountedTime = (): number => {
	let sum = 0;
	timers.subscribe((currentTimers: Timer[]) => {
		currentTimers.forEach((timer) => {
			sum += timer.time;
		});
	});
	return sum;
};
