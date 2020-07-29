const mongoose = require('mongoose');
const config = require('./config/config.js');

module.exports = () => {
	mongoose.connect(
		config.dbUrl,
		{ useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
	).catch(err => {
		logger.error(err);
		process.exit(1);
	});

	mongoose.Promise = global.Promise;
}
