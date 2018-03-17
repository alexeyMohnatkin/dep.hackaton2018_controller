import five from 'johnny-five';


console.log('initializing...');
const board = new five.Board();

board.on('ready', () => {
	console.log('ready');
});
