var yaml = require('js-yaml');
var fs = require('fs');
var _ = require('underscore');

var clean = require('../clean').post;
var recur = require('../recur');

var save = function (post, callback) {

	recur.escape(post);

	// Remove added properties from the object
	var cleanPost = clean(post);

	fs.writeFile(
		post.index,
		'---\n' 
		+ yaml.safeDump(cleanPost.meta)
		+ '---\n'
		+ '"' // This MUST BE DONE to prevent a simple colon to crash the whole app
		+ post.content
		+ '"', // Also " must be escaped in content
		function (err) {
			if (err) throw err;

			recur.unescape(post);

			if (callback) callback(null);
		}
	)	 
}

module.exports = save;