var express = require('express');

var router = express.Router();

var app = require('../../app');

router.route('/')
	.get(function (req, res, next) {
		res.json(200, app.get('jekyll').settings)
	})

module.exports = router;