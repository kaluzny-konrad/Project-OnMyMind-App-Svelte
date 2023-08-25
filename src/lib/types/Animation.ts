export default class Animation {
	animationDuration: number = 1000;
	fadeOutDuration: number = 500;
	startTime: number;

	constructor(startTime?: number) {
		this.startTime = startTime ?? Date.now();
	}

	public isRunning(): boolean {
		return Date.now() - this.startTime <= this.animationDuration;
	}

	public isFadingOut(): boolean {
		console.log(Date.now() - this.startTime);
		const elapsedTime = Date.now() - this.startTime;
		return (
			elapsedTime > this.animationDuration &&
			elapsedTime < this.fadeOutDuration + this.animationDuration
		);
	}
}
