import Timer from './Timer';

export default class MindTimer extends Timer {
	mindId: string;

	constructor(mindId: string) {
		super();
		this.mindId = mindId;
	}
}
