import five from 'johnny-five';
import fetch from 'node-fetch';

import CO2 from './Modules/CO2';
import EventBus from './EventBus';

import * as CO2_EVENTS from './Modules/CO2/events';

console.log('initializing...');
const board = new five.Board();


const STATE = {
	tmp: 0,
	co2: 0,
	light: 0,
};

const handleChangeCo2 = (value) => {
	console.log(`co2: ${value} ppm`);
	STATE.co2 = value;
};


board.on('ready', () => {
	console.log('ready');

	const CO2sensor = new CO2();

	EventBus.on(CO2_EVENTS.VALUE_CHANGED, handleChangeCo2);
});


const senData = async () => {
	const data = STATE;
	try {
		const res = await fetch('http://10.66.170.54:8000/controller', {
			method: 'post',
			body: data,
		});
		console.dir(data);
		console.log(res.ok);
		console.log(`server says: ${await res.text()}`);
	} catch (error) {
		console.error(error);
	}
};
// setInterval(senData, 10000);
