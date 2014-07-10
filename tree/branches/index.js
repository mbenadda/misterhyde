var async = require('async');

var build = function (index, callback) {

	var site;

	async.parallel(
	{
		posts: function (callback) {
			require('./_posts')(index, function (err, posts) {
				if (err) throw err;

				callback(null, posts)
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