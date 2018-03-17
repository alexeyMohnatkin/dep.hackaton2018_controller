import five from 'johnny-five';
import * as EVENTS from './events';
import EventBus from '../../EventBus';

const defaultOptions = {
	controller: 'TMP36',
	pin: 'A0',
	freq: 10000,
};

export default class Temperature {
	constructor(options) {
		this.sensor = new five.Thermometer({
			...defaultOptions,
			...options,
		});
		this.init();
	}

	init() {
		this.sensor.on('data', (value) => {
			EventBus.emit(EVENTS.VALUE_CHANGED, value.celsius);
		});
	}
}
