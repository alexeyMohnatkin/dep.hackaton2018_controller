import five from 'johnny-five';
// import * as EVENTS from './events';
// import EventBus from '../../EventBus';

const defaultOptions = {
	pin: 4,
};

export default class Window {
	constructor(options) {
		this.servo = new five.Servo({
			...defaultOptions,
			...options,
		});
	}

	open() {
		this.servo.to(90);
	}
	close() {
		this.servo.to(0);
	}
}
