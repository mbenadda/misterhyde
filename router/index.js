module.exports = function (app) {


	app.use('/posts', require('./posts'));

	app.use('/meta', require('./meta'));
}