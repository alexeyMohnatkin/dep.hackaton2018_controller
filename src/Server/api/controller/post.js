import EventBus from '../../../EventBus';
import * as EVENTS from '../../../events';

export default (req, res) => {
	const { action } = req.body;

	switch (action) {
		case 'closeWindow':
			EventBus.emit(EVENTS.WINDOW.CLOSE);
			break;
		case 'openWindow':
			EventBus.emit(EVENTS.WINDOW.OPEN);
			break;
		case 'lowTmp':
			EventBus.emit(EVENTS.TEMPERATURE.LOW_LEVEL);
			break;
		case 'highTmp':
			EventBus.emit(EVENTS.TEMPERATURE.HIGH_LEVEL);
			break;
		case 'normalTmp':
			EventBus.emit(EVENTS.TEMPERATURE.NORMAL_LEVEL);
			break;
		case 'lowCO2':
			EventBus.emit(EVENTS.CO2.LOW_LEVEL);
			break;
		case 'highCO2':
			EventBus.emit(EVENTS.CO2.HIGH_LEVEL);
			break;
		case 'normalCO2':
			EventBus.emit(EVENTS.CO2.NORMAL_LEVEL);
			break;
		case 'lowLight':
			EventBus.emit(EVENTS.LIGHT.LOW_LEVEL);
			break;
		case 'highLight':
			EventBus.emit(EVENTS.LIGHT.HIGH_LEVEL);
			break;
		case 'normalLight':
			EventBus.emit(EVENTS.LIGHT.NORMAL_LEVEL);
			break;
		default:
			res.status(400).send('no such action');
			break;
	}

	res.status(200).send('ok');
};

