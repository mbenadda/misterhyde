var _ = require('underscore');

var app = require('../../app');
var save = require('../../modules/save').post;

module.exports = function (req, res, next) {

	var post = {};
	var site;

	// Check that all necessary elements are present
	if (!req.body ||
		!req.body.meta ||
		!req.body.meta.slug || 
		!req.body.meta.date || 
		!req.body.meta.title) {

		console.log(req.body)

		res.json(400);
	} else {

		if (!req.body.content) {
			req.body.content = '';
		}
		post.content = req.body.content;

		post.key = req.body.meta.date 
				 + '-' 
				 + req.body.meta.slug;

		post.index = app.get('maindirectory') 
				   + app.get('pathToJekyll').substring(1, this.length)
				   + '/_posts/'
				   + post.key
				   + '.md';

		post.meta = req.body.meta;

		save(post, function (err) {
			if (err) throw err;

			app.get('jekyll').posts.push(post);
			res.json(_.omit(post, 'index'));
		})	
	}
}