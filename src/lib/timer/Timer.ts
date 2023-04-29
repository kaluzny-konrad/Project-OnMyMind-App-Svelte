export default class Timer {
	protected startTime: Date;
	protected pausedTime: number;
	protected _isRunning: boolean;

	constructor() {
		this.startTime = new Date();
		this.pausedTime = 0;
		this._isRunning = false;
	}

	start() {
		if (!this._isRunning) {
			this.startTime = new Date();
			this._isRunning = true;
		}
	}

	pause() {
		if (this._isRunning) {
			const now = new Date();
			this.pausedTime += now.getTime() - this.startTime.getTime();
			this._isRunning = false;
		}
	}

	getTimeElapsed(): number {
		let elapsed = 0;
		if (this._isRunning) {
			const now = new Date();
			elapsed = now.getTime() - this.startTime.getTime();
		}
		return elapsed + this.pausedTime;
	}

	isRunning(): boolean {
		return this._isRunning;
	}
}
