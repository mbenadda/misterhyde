var _ = require('underscore');

var recur = require('../../modules/recur');

module.exports = function (req, res, next) {

	res.json(200, _.omit(
		recur.unescape(req.post),
		'index'));

}