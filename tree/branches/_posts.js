var async = require('async');

var app = require('../../app');
var yaml = require('../_yaml');

var posts = function (index, callback) {
	// Only select posts
	async.filter(index, require('../_filter')('_posts'), function (_posts_index) {
		
		async.map(_posts_index, yaml.parse, function (err, _posts_content) {
			if (err) throw err;

			var _posts = [];
			for (i = 0; i < _posts_index.length; i++) {
				_posts.push({
					key: _posts_index[i].substring(_posts_index[i].indexOf('_posts')+7, _posts_index[i].length-3),
					meta: _posts_content[i][0] || null,
					content: _posts_content[i][1],
					index : app.get('maindirectory') + _posts_index[i].substring(1, _posts_index[i].length)
				})	
			}

			callback(null, _posts)

		})
	})
}

module.exports = posts;	