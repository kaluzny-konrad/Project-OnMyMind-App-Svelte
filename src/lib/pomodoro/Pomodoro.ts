export default class Pomodoro {
	isRunning: boolean;
	startTime: number;
	beforeElapsedTime: number;
	maxTime: number;

	constructor(maxTime: number) {
		this.maxTime = maxTime;
		this.startTime = Date.now();
		this.beforeElapsedTime = 0;
		this.isRunning = false;
	}

	public start(): void {
		if (!this.isRunning) {
			this.startTime = Date.now();
			this.isRunning = true;
		}
	}

	public stop(): void {
		if (this.isRunning) {
			const now = Date.now();
			const elapsed = now - this.startTime;
			this.beforeElapsedTime += elapsed;
			this.isRunning = false;
		}
	}

	public getRemainingTime(): number {
		let nowElapsedTime = 0;
		if (this.isRunning) {
			const now = Date.now();
			nowElapsedTime = now - this.startTime;
		}
		let milliseconds = nowElapsedTime + this.beforeElapsedTime;
		let remainingTime = this.maxTime - milliseconds;
		if (remainingTime <= 0) {
			remainingTime = 0;
			this.isRunning = false;
		}
		return remainingTime;
	}
}
