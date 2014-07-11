var express = require('express');
var async = require('async');

var app = require('../../app');

var router = express.Router();

router.route('/')
	.get(require('./_list'))
	.post(require('./_add'))

// If :post param is present, set req.post to the right post
router.param('post', function (req, res, next, postKey) {
	async.filter(app.get('jekyll').posts,
		function (item, callback) {
			callback(item.key === postKey)
		},
		function (results) {
			if (results.length === 0 || results.length > 1) {
				res.json(404); // No next() as there's no post to work on
			} else {
				req.post = results[0];

				next();
			}
		}
	)	
});

router.route('/:post')
	.get(require('./_single'))
	.post(require('./_update'))
	.delete(require('./_delete'))

module.exports = router;