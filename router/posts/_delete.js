var async = require('async');
var fs = require('fs');
var _ = require('underscore');

module.exports = function (req, res, next) {

	var jekyll = require('../../app').get('jekyll');

	fs.unlink(req.post.index, function (err) {
		if (err) throw err;

		// Remove deleted post from jekyll object
		jekyll.posts = _.reject(jekyll.posts,
			function (item) {
				if (item === req.post) return true;
			}
		);

		res.json(200);
	})
}