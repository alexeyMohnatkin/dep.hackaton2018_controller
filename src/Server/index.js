import express from 'express';
import bodyParser from 'body-parser';

import createApi from './api';

export default () => {
	const app = express();
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Credentials', 'true');
		next();
	});

	app.use(bodyParser.urlencoded({
		extended: true,
	}));
	app.use(bodyParser.json());


	app.get('*', (req, res) => {
		res.status('404').send('Not found');
	});

	createApi(app);

	app.listen(3000);
	console.log('server started');
};
