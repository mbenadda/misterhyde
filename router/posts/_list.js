var async = require('async');
var _ = require('underscore');

var app = require('../../app');
var recur = require('../../modules/recur');

module.exports = function (req, res, next) {

	// Remove content as we do not need it in this view
	async.map(app.get('jekyll').posts, 
		function (item, callback) {
			item = recur.unescape(item);

			callback(null, _.omit(
				item,
				['content', 'index'])
			);
		},
		function (err, results) {
			if (err) throw err;

			res.json(200, results)
		})
}