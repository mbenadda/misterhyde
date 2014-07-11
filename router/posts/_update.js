var fs = require('fs');
var async = require('async');
var _ = require('underscore');

var recur = require('../../modules/recur');
var save = require('../../modules/save').post;

module.exports = function (req, res, next) {

	var jekyll = require('../../app').get('jekyll');
	var post = recur.extendObject(req.post, req.body);

	save(post, function (err) {
		if (err) throw err;

		if ( // Slug and Date are absent or identical to what's written to disk
			(req.post.meta.slug === req.body.meta.slug
			&& req.post.meta.date === req.body.meta.date)
			||
			(!req.body.meta.slug && !req.body.meta.date)
		) { // Then just send the response as updating was enough
			res.json(200, _.omit(
				recur.unescape(post),
				'index')
			)	
		} else { // Otherwise we need to rename the file too
			var newIndex = post.index.substring(0, post.index.indexOf(req.post.meta.date))
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