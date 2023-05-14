import { vi } from 'vitest';
import Pomodoro from './Pomodoro';

describe('Pomodoro', () => {
	let pomodoro: Pomodoro;
	const maxTime = 10000;

	beforeEach(() => {
		pomodoro = new Pomodoro(maxTime);
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it('initializes with correct values', () => {
		expect(pomodoro.getRemainingTime()).toBe(maxTime);
		expect(pomodoro.isRunning).toBe(false);
	});

	it('starts timer correctly', () => {
		pomodoro.start();
		expect(pomodoro.isRunning).toBe(true);
	});

	it('pauses timer correctly', () => {
		pomodoro.start();
		pomodoro.stop();
		expect(pomodoro.isRunning).toBe(false);
	});

	it('returns correct getRemainingTime() when timer is running', async () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		vi.advanceTimersByTime(expectedTime);
		expect(pomodoro.isRunning).toBe(true);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('returns correct getRemainingTime() when timer is paused', async () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		vi.advanceTimersByTime(expectedTime);
		pomodoro.stop();
		expect(pomodoro.isRunning).toBe(false);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('returns correct getRemainingTime() when timer is paused some time', async () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		vi.advanceTimersByTime(expectedTime);
		pomodoro.stop();
		vi.advanceTimersByTime(expectedTime);
		expect(pomodoro.isRunning).toBe(false);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('returns correct getRemainingTime() when timer is paused some time and then resumed', async () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		vi.advanceTimersByTime(expectedTime);
		pomodoro.stop();
		vi.advanceTimersByTime(expectedTime);
		pomodoro.start();
		vi.advanceTimersByTime(expectedTime);
		expect(pomodoro.isRunning).toBe(true);
		expect(pomodoro.getRemainingTime()).toBe(0);
	});
});
