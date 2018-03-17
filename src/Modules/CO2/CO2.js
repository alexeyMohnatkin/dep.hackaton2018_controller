import five from 'johnny-five';
import * as EVENTS from './events';
import EventBus from '../../EventBus';
import { FREQUENCY } from '../../constants';

export default class CO2 {
	constructor() {
		this.sensor = new five.Sensor({
			pin: 'A2',
			freq: FREQUENCY,
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
