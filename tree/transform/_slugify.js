

module.exports = function (post, callback) {
	// Date part of post filename is comprised of the first 10 characters
	post.meta.date = post.key.substring(0, 10);
	post.meta.slug = post.key.substring(11);

	callback(null, post);

}