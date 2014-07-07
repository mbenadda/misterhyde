
var app = require('../../app');
var async = require('async');
var _ = require('underscore');

module.exports = function (req, res, next) {

	// Remove content as we do not need it in this view
	async.map(app.get('jekyll').posts, 
		function (item, callback) {
			callback(null, _.omit(
				item,
				'content')
			);
		},
		function (err, results) {
			if (err) throw err;
			res.json(200, results)
		})
}