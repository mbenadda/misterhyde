var async = require('async');
var _ = require('underscore');

var app = require('../../app');
var recur = require('../../modules/recur'); // Unlike the underscore one, accepts only one source
var save = require('../../modules/save').post;

module.exports = function (req, res, next) {
	async.filter(app.get('jekyll').posts,
		function (item, callback) {
			callback(item.key === req.postKey)
		},
		function (results) {
			if (!results) {
				res.json(404);
			} else if (results.length > 1) {
				res.json(409)
			} else {
				var post = recur.extendObject(results[0], req.body)

				save(post, function (err) {
					if (err) throw err;

					res.json(200, _.omit(
						recur.unescape(post),
						'index')
					);
				})
			}
		}
	);
}