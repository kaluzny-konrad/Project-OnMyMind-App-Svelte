import MindTimer from './MindTimer';

describe('MindTimer', () => {
	let timer: MindTimer;
	const originalName = 'mind1';

	beforeEach(() => {
		timer = new MindTimer(originalName);
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
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

	it('returns correct getTimeElapsed() when timer is running', () => {
		const expectedTime = 5000;
		timer.start();
		jest.advanceTimersByTime(expectedTime);
		expect(timer.isRunning).toBe(true);
		expect(timer.getTimeElapsed()).toBe(expectedTime);
	});

	it('returns correct getTimeElapsed() when timer is stopped', () => {
		const expectedTime = 5000;
		timer.start();
		jest.advanceTimersByTime(expectedTime);
		timer.stop();
		expect(timer.isRunning).toBe(false);
		expect(timer.getTimeElapsed()).toBe(expectedTime);
	});

	it('returns correct getTimeElapsed() when timer is stopped some time', () => {
		const expectedTime = 5000;
		timer.start();
		jest.advanceTimersByTime(expectedTime);
		timer.stop();
		jest.advanceTimersByTime(expectedTime);
		expect(timer.isRunning).toBe(false);
		expect(timer.getTimeElapsed()).toBe(expectedTime);
	});

	it('returns correct getTimeElapsed() when timer is stopped and started again', () => {
		const expectedTime = 5000;
		timer.start();
		jest.advanceTimersByTime(expectedTime);
		timer.stop();
		jest.advanceTimersByTime(expectedTime);
		timer.start();
		jest.advanceTimersByTime(expectedTime);
		expect(timer.isRunning).toBe(true);
		expect(timer.getTimeElapsed()).toBe(expectedTime * 2);
	});
});
