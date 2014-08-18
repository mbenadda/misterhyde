module.exports = function (app) {

	app.use('/posts', require('./posts'));
	app.use('/settings', require('./settings'));

	app.use('/meta', require('./meta'));
}