var fs = require('fs');
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

					if ( // Slug and Date are absent or identical to what's written to disk
						(results[0].meta.slug === req.body.meta.slug
						&& results[0].meta.date === req.body.meta.date)
						||
						(!req.body.meta.slug && !req.body.meta.date)
					) { // Then just send the response as updating was enough
						res.json(200, _.omit(
							recur.unescape(post),
							'index')
						)	
					} else { // Otherwise we need to rename the file too
						var newIndex = post.index.substring(0, post.index.indexOf(results[0].meta.date))
									 + post.meta.date
									 + '-'
									 + post.meta.slug
									 + '.md';

						fs.rename(post.index, newIndex, function (err) {
							if (err) throw err;

							// Change index and key in live app
							post.index = newIndex;
							post.key = post.meta.date + '-' + post.meta.slug;

							// Finally send the updated response
							res.json(200, _.omit(
								recur.unescape(post),
								'index')
							)	
						});
					}
				})
			}
		}
	);
}