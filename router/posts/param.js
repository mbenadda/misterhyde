var async = require('async');
var app = require('../../app');

module.exports = function (req, res, next, postKey) {
	async.filter(app.get('jekyll').posts,
		function (item, callback) {
			callback(item.key === postKey)
		},
		function (results) {
			if (results.length === 0 || results.length > 1) {
				res.json(404); // No next() as there's no post to work on
			} else {
				req.post = results[0];

				next();
			}
		}
	)	
}