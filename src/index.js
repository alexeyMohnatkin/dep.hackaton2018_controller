import five from 'johnny-five';
import fetch from 'node-fetch';

import './Server';

import EventBus from './EventBus';
import CO2 from './Modules/CO2';
import Light from './Modules/Light';
import Temperature from './Modules/Temperature';

import * as EVENTS from './events';

import { END_POINT_URL, FREQUENCY, ROOM_ID } from './constants';

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
		const body = {
			...STATE,
			roomId: ROOM_ID,
		};
		console.log(body);

		const res = await fetch(END_POINT_URL, {
			headers: {
				'Content-type': 'application/json',
			},
			method: 'post',
			body: JSON.stringify(body),
		});
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

	EventBus.on(EVENTS.TEMPERATURE.VALUE_CHANGED, handleChangeTmp);
	EventBus.on(EVENTS.CO2.VALUE_CHANGED, handleChangeCo2);
	EventBus.on(EVENTS.LIGHT.VALUE_CHANGED, handleChangeLight);

	setInterval(senData, FREQUENCY);
});

