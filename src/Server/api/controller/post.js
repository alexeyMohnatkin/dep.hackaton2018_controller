import EventBus from '../../../EventBus';
import * as EVENTS from '../../../events';

export default (req, res) => {
	const { action } = req.body;

	switch (action) {
		case 'closeWindow':
			EventBus.emit('CLOSE_WINDOW');
			res.status(200).send('ok');
			break;
		case 'lowTmp':
			EventBus.emit(EVENTS.TEMPERATURE.LOW_LEVEL);
			res.status(200).send('ok');
			break;
		case 'highTmp':
			EventBus.emit(EVENTS.TEMPERATURE.HIGH_LEVEL);
			res.status(200).send('ok');
			break;
		case 'normalTmp':
			EventBus.emit(EVENTS.TEMPERATURE.NORMAL_LEVEL);
			res.status(200).send('ok');
			break;
		case 'lowCO2':
			EventBus.emit(EVENTS.CO2.LOW_LEVEL);
			res.status(200).send('ok');
			break;
		case 'highCO2':
			EventBus.emit(EVENTS.CO2.HIGH_LEVEL);
			res.status(200).send('ok');
			break;
		case 'normalCO2':
			EventBus.emit(EVENTS.CO2.NORMAL_LEVEL);
			res.status(200).send('ok');
			break;
		case 'lowLight':
			EventBus.emit(EVENTS.LIGHT.LOW_LEVEL);
			res.status(200).send('ok');
			break;
		case 'highLight':
			EventBus.emit(EVENTS.LIGHT.HIGH_LEVEL);
			res.status(200).send('ok');
			break;
		case 'normalLight':
			EventBus.emit(EVENTS.LIGHT.NORMAL_LEVEL);
			res.status(200).send('ok');
			break;
		default:
			res.status(400).send('no such action');
			break;
	}
};

