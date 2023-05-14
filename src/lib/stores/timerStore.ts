import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import MindTimer from '../types/MindTimer';

const storageName = 'timers-list';

const data: MindTimer[] = browser
	? JSON.parse(window?.localStorage?.getItem(storageName) as string) ?? []
	: [];

export const timers: Writable<MindTimer[]> = writable(
	data.map((timer) => {
		const correctTimer = new MindTimer(timer.mindId);
		correctTimer.isRunning = timer.isRunning;
		correctTimer.startTime = timer.startTime;
		correctTimer.beforeElapsedTime = timer.beforeElapsedTime;
		return correctTimer;
	}),
);

timers.subscribe((value: MindTimer[]) => {
	if (browser) {
		localStorage?.setItem(storageName, JSON.stringify(value));
	}
});

export const addTimerToStore = (mindId: string): MindTimer => {
	const existedTimer = getTimerFromStore(mindId);
	if (existedTimer) return existedTimer;

	const timer: MindTimer = new MindTimer(mindId);

	timers.update((currentTimers: MindTimer[]) => {
		return [...currentTimers, timer];
	});
	return timer;
};

export const getTimerFromStore = (mindId: string): MindTimer | null => {
	let timer: MindTimer | null = null;
	timers.subscribe((currentTimers: MindTimer[]) => {
		timer = currentTimers.find(
			(timer: MindTimer) => timer?.mindId === mindId,
		) as MindTimer;
	});
	if (timer) return timer;
	return null;
};

export const deleteTimerFromStore = (mindId: string): void => {
	timers.update((currentTimers: MindTimer[]) => {
		return currentTimers.filter((timer: MindTimer) => timer?.mindId !== mindId);
	});
};

export const startTimerInStore = (mindId: string): void => {
	timers.update((timers) => {
		timers.forEach((timer) => timer?.stop());
		timers.find((timer) => timer?.mindId === mindId)?.start();

		return timers;
	});
};

export const stopTimerInStore = (mindId: string): void => {
	timers.update((timers) => {
		timers.find((timer) => timer?.mindId === mindId)?.stop();
		return timers;
	});
};

export const getTimersTimeElapsedSum = (): number => {
	let sum = 0;
	timers.subscribe((currentTimers: MindTimer[]) => {
		sum = currentTimers?.reduce((sum: number, timer: MindTimer) => {
			return sum + timer?.getTimeElapsed();
		}, 0);
	});
	return sum;
};
