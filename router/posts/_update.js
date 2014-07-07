var app = require('../../app');
var async = require('async');
var _ = require('underscore');
_.recurExtendObject = require('../../modules/recurExtendObject');
// Unlike the underscore one, accepts only one source

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
				res.json(200,
					_.recurExtendObject(results[0], req.body));
				// Also save it
			}
		}
	);
}