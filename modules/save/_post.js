var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('underscore');

var clean = require('../clean').post;
var recur = require('../recur');

var save = function (post, callback) {

	post = recur.escape(post);

	// Remove added properties from the object
	var cleanPost = clean(post);

	fs.writeFile(
		post.index,
		'---\n' 
		+ yaml.safeDump(cleanPost.meta)
		+ '---\n'
		+ post.content,
		function (err) {
			if (err) throw err;

			if (callback) callback(null);
		}
	)	 
}

module.exports = save;