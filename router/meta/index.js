var express = require('express');
var async = require('async');
var _ = require('underscore');

var router = express.Router();
var app = require('../../app')

router.route('/:type')
	.get(function (req, res, next) {
		
		async.concat(app.get('jekyll').posts,
			function (item, callback) {
				callback(null, item.meta[req.params.type])
			},
			function (err, results) {
				if (err) throw err;
				res.json(200, _.uniq(results))
			}) 
	})

module.exports = router;