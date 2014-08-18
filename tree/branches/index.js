var async = require('async');

var build = function (index, callback) {

	var site;

	async.parallel(
	{
		posts: function (callback) {
			require('./_posts')(index, function (err, posts) {
				if (err) throw err;

				callback(null, posts);
			})
		},
		settings: function (callback) {
			require('./_settings')(index, function (err, settings) {
				if (err) throw err;

				callback(null, settings);
			})
		}
	},
	function (err, results) {
		if (err) throw err;

		callback(null, results);

	})
}

module.exports = {
	build: build
}