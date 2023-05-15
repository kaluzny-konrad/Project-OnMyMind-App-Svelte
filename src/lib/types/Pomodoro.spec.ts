import Pomodoro from './Pomodoro';

describe('Pomodoro', () => {
	let pomodoro: Pomodoro;
	const maxTime = 10000;

	beforeEach(() => {
		pomodoro = new Pomodoro(maxTime);
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
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

	it('returns correct getRemainingTime() when timer is running', () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		jest.advanceTimersByTime(expectedTime);
		expect(pomodoro.isRunning).toBe(true);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('returns correct getRemainingTime() when timer is paused', () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		jest.advanceTimersByTime(expectedTime);
		pomodoro.stop();
		expect(pomodoro.isRunning).toBe(false);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('returns correct getRemainingTime() when timer is paused some time', () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		jest.advanceTimersByTime(expectedTime);
		pomodoro.stop();
		jest.advanceTimersByTime(expectedTime);
		expect(pomodoro.isRunning).toBe(false);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('returns correct getRemainingTime() when timer is paused some time and then resumed', () => {
		const expectedTime = maxTime / 2;
		pomodoro.start();
		jest.advanceTimersByTime(expectedTime);
		pomodoro.stop();
		jest.advanceTimersByTime(expectedTime);
		pomodoro.start();
		jest.advanceTimersByTime(expectedTime);
		expect(pomodoro.isRunning).toBe(true);
		expect(pomodoro.getRemainingTime()).toBe(0);
	});
});
