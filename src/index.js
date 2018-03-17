import five from 'johnny-five';
import fetch from 'node-fetch';

import EventBus from './EventBus';
import CO2 from './Modules/CO2';
import Light from './Modules/Light';
import Temperature from './Modules/Temperature';

import * as CO2_EVENTS from './Modules/CO2/events';
import * as LIGHT_EVENTS from './Modules/Light/events';
import * as TEMPERATURE_EVENTS from './Modules/Temperature/events';

import { END_POINT_URL, FREQUENCY } from './constants';

console.log('initializing...');
const board = new five.Board();

const STATE = {
	tmp: 0,
	co2: 0,
	light: 0,
};

const handleChangeCo2 = (value) => {
	STATE.co2 = value;
};
const handleChangeLight = (value) => {
	STATE.light = value;
};
const handleChangeTmp = (value) => {
	STATE.tmp = value;
};


const senData = async () => {
	try {
		console.log(STATE);
		const res = await fetch(END_POINT_URL, {
			method: 'post',
			body: STATE,
		});
		console.log(res.ok);
		console.log(`server says: ${await res.text()}`);
	} catch (error) {
		console.error(error);
	}
};


board.on('ready', () => {
	console.log('ready');

	const TemperatureSensor = new Temperature({
		pin: 'A0',
		freq: FREQUENCY,
	});
	const CO2sensor = new CO2({
		pin: 'A2',
		freq: FREQUENCY,
	});
	const lightSensor = new Light({
		pin: 'A3',
		freq: FREQUENCY,
	});

	EventBus.on(TEMPERATURE_EVENTS.VALUE_CHANGED, handleChangeTmp);
	EventBus.on(CO2_EVENTS.VALUE_CHANGED, handleChangeCo2);
	EventBus.on(LIGHT_EVENTS.VALUE_CHANGED, handleChangeLight);

	setInterval(senData, FREQUENCY);
});

