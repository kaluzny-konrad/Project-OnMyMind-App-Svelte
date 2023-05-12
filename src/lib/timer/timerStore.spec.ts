import { vi } from 'vitest';
import {
	timers,
	addTimerToStore,
	getTimerFromStore,
	deleteTimerFromStore,
	startTimerInStore,
	stopTimerInStore,
	getTimersTimeElapsedSum,
} from './timerStore';

describe('Timers Store', () => {
	beforeEach(() => {
		timers.set([]);
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	test('Adding a timer to the store', () => {
		const timer = addTimerToStore('mindId');
		expect(timer).toBeDefined();
	});

	test('Getting a timer from the store', () => {
		const timer = addTimerToStore('mindId');
		const foundTimer = getTimerFromStore('mindId');
		expect(foundTimer).toEqual(timer);
	});

	test('Getting a timer from the store with correct mind ID', () => {
		const originalName = 'bcecfb05-fd98-4a70-a7c3-e8ce22846e15';
		const timer = addTimerToStore(originalName);
		addTimerToStore(originalName);
		const foundTimer = getTimerFromStore(originalName);
		expect(foundTimer).toBeDefined();
		expect(foundTimer).not.toBeNull();
		expect(foundTimer).toStrictEqual(timer);
		if (!foundTimer) return;
		expect(timer.mindId).toBe(originalName);
		expect(foundTimer.mindId).toBe(originalName);

		let count = 0;
		timers.subscribe(() => count++);
		expect(count).toEqual(1);
	});

	test('Deleting a timer from the store', () => {
		addTimerToStore('mindId');
		deleteTimerFromStore('mindId');
		const foundTimer = getTimerFromStore('mindId');
		expect(foundTimer).toBeNull();
	});

	test('Starting a timer in the store', () => {
		const timer = addTimerToStore('mindId');
		startTimerInStore('mindId');
		expect(timer.isRunning).toBe(true);
	});

	test('Stopping a timer in the store', () => {
		const timer = addTimerToStore('mindId');
		startTimerInStore('mindId');
		stopTimerInStore('mindId');
		expect(timer.isRunning).toBe(false);
	});

	test('Getting sum of all timers time elapsed', async () => {
		const expectedTime = 5000;
		const timer1 = addTimerToStore('mindId1');
		const timer2 = addTimerToStore('mindId2');
		startTimerInStore('mindId1');
		vi.advanceTimersByTime(expectedTime);
		startTimerInStore('mindId2');
		vi.advanceTimersByTime(expectedTime);
		expect(getTimersTimeElapsedSum()).toBe(expectedTime * 2);
		expect(timer1.getTimeElapsed()).toBe(expectedTime);
		expect(timer2.getTimeElapsed()).toBe(expectedTime);
		expect(timer1.isRunning).toBe(false);
		expect(timer2.isRunning).toBe(true);
	});

	test('Sum of all timers is always equal or greater than 0', async () => {
		expect(getTimersTimeElapsedSum()).toBeGreaterThanOrEqual(0);
	});

	test('Is always only one timer running', async () => {
		const timer1 = addTimerToStore('mindId1');
		const timer2 = addTimerToStore('mindId2');
		startTimerInStore('mindId1');
		startTimerInStore('mindId2');
		expect(timer1.isRunning).toBe(false);
		expect(timer2.isRunning).toBe(true);
	});

	test('Is always only one instance of timer with same mind ID', async () => {
		const timer1 = addTimerToStore('mindId1');
		const timer2 = addTimerToStore('mindId1');
		expect(timer1 === timer2).toBe(true);
	});
});
