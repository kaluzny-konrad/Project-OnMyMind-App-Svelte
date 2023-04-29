import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import MindTimer from './MindTimer';

const storageName = 'timers-list';

const data: MindTimer[] = browser
	? JSON.parse(window.localStorage.getItem(storageName) as string) ?? []
	: [];

export const timers: Writable<MindTimer[]> = writable(data);

timers.subscribe((value: MindTimer[]) => {
	if (browser) {
		localStorage.setItem(storageName, JSON.stringify(value));
	}
});

export const addTimerToStore = (mindId: string): MindTimer => {
	let timer: MindTimer = new MindTimer(mindId);

	timers.update((currentTimers: MindTimer[]) => {
		return [...currentTimers, timer];
	});
	return timer;
};

export const getTimerFromStore = (mindId: string): MindTimer | null => {
	let timer: MindTimer | null = null;
	timers.subscribe((currentTimers: MindTimer[]) => {
		timer = currentTimers.find(
			(timer: MindTimer) => timer.mindId === mindId,
		) as MindTimer;
	});
	return timer;
};

export const deleteTimerFromStore = (mindId: string): void => {
	timers.update((currentTimers: MindTimer[]) => {
		return currentTimers.filter((timer: MindTimer) => timer.mindId !== mindId);
	});
};

export const startTimerInStore = (mindId: string): void => {
	timers.update((timers) => {
		timers.forEach((timer) => timer.pause());
		timers.find((timer) => timer.mindId === mindId)?.start();

		return timers;
	});
};

export const stopTimerInStore = (mindId: string): void => {
	timers.update((timers) => {
		timers.find((timer) => timer.mindId === mindId)?.pause();
		return timers;
	});
};

export const getTimerTimeElapsed = (mindId: string): number => {
	let timeElapsed: number = 0;
	timers.subscribe((currentTimers: MindTimer[]) => {
		timeElapsed = currentTimers
			.find((timer: MindTimer) => timer.mindId === mindId)
			?.getTimeElapsed() as number;
	});
	return timeElapsed;
};

export const getTimerIsRunning = (mindId: string): boolean => {
	let isRunning: boolean = true;
	timers.subscribe((currentTimers: MindTimer[]) => {
		isRunning = currentTimers
			.find((timer: MindTimer) => timer.mindId === mindId)
			?.isRunning() as boolean;
	});
	return isRunning;
};

export const getTimersTimeElapsedSum = (): number => {
	let sum: number = 0;
	timers.subscribe((currentTimers: MindTimer[]) => {
		sum = currentTimers.reduce((sum: number, timer: MindTimer) => {
			return sum + timer.getTimeElapsed();
		}, 0);
	});
	return sum;
};
