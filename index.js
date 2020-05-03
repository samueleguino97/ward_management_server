const { connectToDb } = require('./db/config');
const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const cors = require('cors');

connectToDb().then(() => {
	app.emit('ready');
});
app.on('ready', () => {
	const { auth, projects } = require('./routes');
	const mainRouter = express.Router();
	mainRouter.use(auth.path, auth.router);
	mainRouter.use(projects.path, projects.router);

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors({ origin: '*' }));
	app.use('/api', mainRouter);

	const { PORT } = process.env;
	app.listen(PORT, () => {
		console.log('Server live at', PORT);
	});
});
