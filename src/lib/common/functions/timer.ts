export class Timer {
	private intervalId?: NodeJS.Timer;
	public remainingTime: number;
	public isRunning: boolean = false;

	constructor(private readonly maxTime: number) {
		this.remainingTime = maxTime;
	}

	private tickTime() {
		this.remainingTime--;
		if (this.remainingTime === 0) {
			this.pause();
		}
	}

	public start() {
		this.intervalId = setInterval(() => {
			this.tickTime();
		}, 1000);
		this.isRunning = true;
	}

	public pause() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
			this.isRunning = false;
		}
	}

	public reset() {
		this.pause();
		this.remainingTime = this.maxTime;
	}

	public formatTime(): string {
		const minutes = Math.floor(this.remainingTime / 60);
		const seconds = this.remainingTime - minutes * 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	}
}
