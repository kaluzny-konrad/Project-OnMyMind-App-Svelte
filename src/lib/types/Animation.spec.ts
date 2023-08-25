import Animation from './Animation';

describe('Animation', () => {
	let animation: Animation;
	const animationDuration = 1000;

	beforeEach(() => {
		animation = new Animation();
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it('initializes with correct values', () => {
		expect(animation.isRunning()).toBe(true);
		expect(animation.isFadingOut()).toBe(false);
	});

	it('returns correct status when animation is running', () => {
		jest.advanceTimersByTime(animationDuration - 1);
		expect(animation.isRunning()).toBe(true);
		expect(animation.isFadingOut()).toBe(false);
	});

	it('returns correct status when animation is fading out', () => {
		jest.advanceTimersByTime(animationDuration + 1);
		expect(animation.isRunning()).toBe(false);
		expect(animation.isFadingOut()).toBe(true);
	});
});
