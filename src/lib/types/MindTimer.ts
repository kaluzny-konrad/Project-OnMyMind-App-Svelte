export default class MindTimer {
	mindId: string;
	isRunning: boolean;
	startTime: number;
	beforeElapsedTime: number;

	constructor(mindId: string) {
		this.mindId = mindId;
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

	public getTimeElapsed(): number {
		let nowElapsedTime = 0;
		if (this.isRunning) {
			const now = Date.now();
			nowElapsedTime = now - this.startTime;
		}
		const milliseconds = nowElapsedTime + this.beforeElapsedTime;
		return milliseconds;
	}
}
