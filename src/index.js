// import five from 'johnny-five';
import fetch from 'node-fetch';


// console.log('initializing...');
// const board = new five.Board();

// board.on('ready', () => {
// 	console.log('ready');
// });

const getRandomValue = (min, max) => parseInt((Math.random() * (max - min)) + min, 10);
const generateData = () => {
	const tmp = getRandomValue(20, 25);
	const co2 = getRandomValue(600, 650);
	const light = getRandomValue(300, 320);

	return {
		tmp,
		co2,
		light,
	};
};

const senData = async () => {
	const data = generateData();
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
setInterval(senData, 10000);
