var async = require('async');
var _ = require('underscore');

var app = require('../../app');
var recur = require('../../modules/recur');

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

				res.json(200, _.omit(
					recur.unescape(results[0]),
					'index'));
			}
		})

}