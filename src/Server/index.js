import express from 'express';
import bodyParser from 'body-parser';

import createApi from './api';

const app = express();

app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());


app.get('*', (req, res) => {
	res.status('404').send('Not found');
});

createApi(app);

app.listen(3000);

export default app;
