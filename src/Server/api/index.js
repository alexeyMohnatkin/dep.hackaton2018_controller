import * as CONTROLLER from './controller';

export default (app) => {
	app.route('/api/controller')
		.post(CONTROLLER.POST);
};
