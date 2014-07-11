var async = require('async');
var fs = require('fs');

var app = require('../../app');

module.exports = function (req, res, next) {

	async.filter(app.get('jekyll').posts,
		function (item, callback) {
			callback(item.key === req.postKey);
		},
		function (results) {
			if (!results) {
				res.json(404);
			} else if (results.length > 1) {
				res.json(400);
			} else {
				fs.unlink(results[0].index, function (err) {
					if (err) throw err;

					delete app.get('jekyll').posts[app.get('jekyll').posts.length-1];
					res.json(200);
				})
			}
		}
	)
}