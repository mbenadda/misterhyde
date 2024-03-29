var express = require('express');
var router = express.Router();

router.route('/')
	.get(require('./_list'))
	.post(require('./_add'))

// If :post param is present, set req.post to the right post
router.param('post', require('./param'));

router.route('/:post')
	.get(require('./_single'))
	.post(require('./_update'))
	.delete(require('./_delete'))

module.exports = router;