var async = require('async');
var _ = require('underscore');
_.recurExtendObject = require('../../modules/recurExtendObject');
// Unlike the underscore one, accepts only one source

var app = require('../../app');
var save = require('../../modules/save');

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
				var post = _.recurExtendObject(results[0], req.body)

				save('post', post, function (err) {
					if (err) throw err;

					res.json(200, post);
				})

				
			}
		}
	);
}