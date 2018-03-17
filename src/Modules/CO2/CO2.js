import five from 'johnny-five';
import * as EVENTS from './events';
import EventBus from '../../EventBus';

const defaultOptions = {
	pin: 'A0',
	freq: 10000,
};

export default class CO2 {
	constructor(options) {
		this.sensor = new five.Sensor({
			...defaultOptions,
			...options,
		});
		this.init();
	}

	init() {
		this.sensor.on('data', (value) => {
			EventBus.emit(EVENTS.VALUE_CHANGED, this.normalizeValue(value));
		});
	}

	normalizeValue(value) {
		// need to be corrected
		return value * 20;
	}
}
