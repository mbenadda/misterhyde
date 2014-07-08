var clone = require('clone');

var post = function (post) {

	var newPost = clone(post);
	
	// remove all added properties from the clone
	delete newPost.meta.slug;
	delete newPost.meta.date;
	delete newPost.index;
	
	return newPost;
}

module.exports = {
	post: post
}