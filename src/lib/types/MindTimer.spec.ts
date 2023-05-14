import { vi } from 'vitest';
import MindTimer from './MindTimer';

describe('MindTimer', () => {
	let timer: MindTimer;
	const originalName = 'mind1';

	beforeEach(() => {
		timer = new MindTimer(originalName);
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it('initializes with correct values', () => {
		expect(timer.getTimeElapsed()).toBe(0);
		expect(timer.isRunning).toBe(false);
		expect(timer.mindId).toBe(originalName);
	});

	it('starts timer correctly', () => {
		timer.start();
		expect(timer.isRunning).toBe(true);
	});

	it('stops timer correctly', () => {
		timer.start();
		timer.stop();
		expect(timer.isRunning).toBe(false);
	});

	it('returns correct getTimeElapsed() when timer is running', async () => {
		const expectedTime = 5000;
		timer.start();
		vi.advanceTimersByTime(expectedTime);
		expect(timer.isRunning).toBe(true);
		expect(timer.getTimeElapsed()).toBe(expectedTime);
	});

	it('returns correct getTimeElapsed() when timer is stoped', async () => {
		const expectedTime = 5000;
		timer.start();
		vi.advanceTimersByTime(expectedTime);
		timer.stop();
		expect(timer.isRunning).toBe(false);
		expect(timer.getTimeElapsed()).toBe(expectedTime);
	});

	it('returns correct getTimeElapsed() when timer is stoped some time', async () => {
		const expectedTime = 5000;
		timer.start();
		vi.advanceTimersByTime(expectedTime);
		timer.stop();
		vi.advanceTimersByTime(expectedTime);
		expect(timer.isRunning).toBe(false);
		expect(timer.getTimeElapsed()).toBe(expectedTime);
	});

	it('returns correct getTimeElapsed() when timer is stoped and started again', async () => {
		const expectedTime = 5000;
		timer.start();
		vi.advanceTimersByTime(expectedTime);
		timer.stop();
		vi.advanceTimersByTime(expectedTime);
		timer.start();
		vi.advanceTimersByTime(expectedTime);
		expect(timer.isRunning).toBe(true);
		expect(timer.getTimeElapsed()).toBe(expectedTime * 2);
	});
});
