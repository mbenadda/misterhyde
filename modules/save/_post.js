var yaml = require('js-yaml');
var fs = require('fs');
var clean = require('../clean').post;

module.exports = function (post, callback) {

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
			if (callback) callback(null);
		}
	) 
}