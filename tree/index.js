var async = require('async');

var app = require('../app');
var traverseDir = require('./_traverseDir');
var yaml = require('./_yaml');
var transform = require('./transform');


	


function walkTheSite (pathToJekyll, callback) {

	var site = {};

	traverseDir(pathToJekyll, function (err, rawDir) {
		if (err) throw err;
		
		// Remove blacklisted dirs and files from the list
		async.filter(rawDir, require('./_filter')('blacklist', pathToJekyll), function (index) {
			
			// Only select posts
			async.filter(index, require('./_filter')('_posts', pathToJekyll), function (_posts_index) {
				
				async.mapSeries(_posts_index, yaml.parse, function (err, _posts_content) {
					if (err) throw err;

					_posts = [];
					for (i = 0; i < _posts_index.length; i++) {
						_posts.push({
							key: _posts_index[i].substring(_posts_index[i].indexOf('_posts')+7, _posts_index[i].length-3),
							meta: _posts_content[i][0] || null,
							content: _posts_content[i][1],
							index : app.get('maindirectory') + _posts_index[i].substring(1, _posts_index[i].length)
						})	

					}

					site.posts = _posts;

					transform(site);

					callback(null, site)

				})
			})
		})
	})
}

module.exports = walkTheSite;