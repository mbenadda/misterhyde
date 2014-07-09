var slugify = require('./_slugify');

module.exports = function (site) {

	// Posts
	for (i = 0; i < site.posts.length; i++) {
		slugify(site.posts[i], function (err, transformed) {
			if (err) throw err;
			// do some serial processing
		})
	}

}