var express = require('express');
var async = require('async')
var router = express.Router();

router.route('/')
	.get(require('./_list'))

// If :post param is present, set req.post to the right post
router.param('post', function (req, res, next, postKey) {
	req.postKey = postKey;
	next();
});

router.route('/:post')
	.get(require('./_single'))
	.post(require('./_update'))

module.exports = router;