import five from 'johnny-five';

import startServer from './Server';
import post from './post';

import EventBus from './EventBus';
import CO2 from './Modules/CO2';
import Light from './Modules/Light';
import Temperature from './Modules/Temperature';
import Window from './Modules/Window';

import * as EVENTS from './events';

import { END_POINT_URL, FREQUENCY, ROOM_ID } from './constants';

console.log('initializing...');
const board = new five.Board();

const STATE = {
	tmp: 0,
	co2: 0,
	light: 0,
	event: null,
};

const senData = async () => {
	const body = {
		...STATE,
		roomId: ROOM_ID,
	};
	console.log(body);

	await post(`${END_POINT_URL}/controller`, body);
	STATE.event = null;
};


board.on('ready', () => {
	console.log('ready');
	startServer();


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
	const windowServo = new Window({
		pin: 4,
	});

	const handleChangeCo2 = (value) => {
		STATE.co2 = value;
	};
	const handleChangeLight = (value) => {
		STATE.light = value;
	};
	const handleChangeTmp = (value) => {
		STATE.tmp = value;
	};
	const handleOpenWindow = async () => {
		STATE.event = 'WINDOW_OPEN';
		windowServo.open();
		post(`${END_POINT_URL}/event/${ROOM_ID}`, { event: 'WINDOW_OPEN' });
	};
	const handleCloseWindow = async () => {
		STATE.event = 'WINDOW_CLOSE';
		windowServo.close();
		post(`${END_POINT_URL}/event/${ROOM_ID}`, { event: 'WINDOW_CLOSE' });
	};


	EventBus.on(EVENTS.TEMPERATURE.VALUE_CHANGED, handleChangeTmp);
	EventBus.on(EVENTS.CO2.VALUE_CHANGED, handleChangeCo2);
	EventBus.on(EVENTS.LIGHT.VALUE_CHANGED, handleChangeLight);
	EventBus.on(EVENTS.WINDOW.OPEN, handleOpenWindow);
	EventBus.on(EVENTS.WINDOW.CLOSE, handleCloseWindow);

	setInterval(senData, FREQUENCY);
});

