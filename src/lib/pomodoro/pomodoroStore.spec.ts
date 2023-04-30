import { vi } from 'vitest';
import {
	addPomodoroToStore,
	getPomodoroFromStore,
	deletePomodoroFromStore,
	startPomodoroInStore,
	stopPomodoroInStore,
	pomodoros,
} from './pomodoroStore';
import type Pomodoro from './Pomodoro';

describe('PomodoroStore', () => {
	const maxTime = 10 * 1000;
	const standardMaxTime = 60 * 1000;

	beforeEach(() => {
		pomodoros.set([]);
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it('adds pomodoro to store correctly', () => {
		const pomodoro = addPomodoroToStore(maxTime);
		expect(pomodoro).toBeDefined();
		expect(pomodoro.getRemainingTime()).toBe(maxTime);
	});

	it('gets pomodoro from store correctly', () => {
		const pomodoro = addPomodoroToStore(maxTime);
		const foundPomodoro = getPomodoroFromStore() as Pomodoro;
		expect(foundPomodoro.getRemainingTime()).toBe(maxTime);
		expect(foundPomodoro).toBe(pomodoro);
	});

	test('it adds only one pomodoro to store', () => {
		addPomodoroToStore(maxTime);
		addPomodoroToStore(maxTime);

		let count = 0;
		pomodoros.subscribe(() => count++);
		expect(count).toEqual(1);
	});

	it('deletes pomodoro from store correctly', () => {
		addPomodoroToStore(maxTime);
		deletePomodoroFromStore();
		expect(getPomodoroFromStore()).toBeNull();
	});

	it('pomodoro max time is always positive', () => {
		addPomodoroToStore(-maxTime);
		const pomodoro = getPomodoroFromStore() as Pomodoro;
		expect(pomodoro.getRemainingTime()).toBe(standardMaxTime);
	});

	it('returns null if no pomodoro in store', () => {
		const pomodoro = getPomodoroFromStore();
		expect(pomodoro).toBeNull();
	});

	it('starts pomodoro in store correctly', () => {
		addPomodoroToStore(maxTime);
		startPomodoroInStore();
		const pomodoro = getPomodoroFromStore() as Pomodoro;
		expect(pomodoro.isRunning).toBe(true);
	});

	it('stops pomodoro in store correctly', () => {
		addPomodoroToStore(maxTime);
		startPomodoroInStore();
		stopPomodoroInStore();
		const pomodoro = getPomodoroFromStore() as Pomodoro;
		expect(pomodoro.isRunning).toBe(false);
	});

	it('returns correct getRemainingTime() when pomodoro is running', async () => {
		addPomodoroToStore(maxTime);
		startPomodoroInStore();
		const expectedTime = maxTime / 2;
		vi.advanceTimersByTime(expectedTime);
		const pomodoro = getPomodoroFromStore() as Pomodoro;
		expect(pomodoro.isRunning).toBe(true);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('returns correct getRemainingTime() when pomodoro is stoped', async () => {
		addPomodoroToStore(maxTime);
		startPomodoroInStore();
		const expectedTime = maxTime / 2;
		vi.advanceTimersByTime(expectedTime);
		stopPomodoroInStore();
		const pomodoro = getPomodoroFromStore() as Pomodoro;
		expect(pomodoro.isRunning).toBe(false);
		expect(pomodoro.getRemainingTime()).toBe(expectedTime);
	});

	it('Time of pomodoro is always positive', () => {
		expect(getPomodoroFromStore()).toBeNull();
		const pomodoro = addPomodoroToStore(-maxTime);
		expect(pomodoro.getRemainingTime()).toBe(standardMaxTime);
	});
});
