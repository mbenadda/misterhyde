var _ = require('underscore');

var extendObject = function (target, source) {
	for (var prop in source) {
		if (prop in target && typeof target[prop] == 'object') {
			extendObject(target[prop], source[prop]);
		} else {
			target[prop] = source[prop];
		}
	}
	return target;
}

var deepEscape = function (target) {

	for (var prop in target) {
		if (typeof target[prop] == 'object') {
			deepEscape(target[prop]);
		} else {
			target[prop] = _.escape(target[prop]);
		}
	}

	return target;
}

var deepUnescape = function (target) {

	for (var prop in target) {
		if (typeof target[prop] == 'object') {
			deepUnescape(target[prop]);
		} else {
			target[prop] = _.unescape(target[prop]);
		}
	}

	return target;
}

module.exports = {
	extendObject: extendObject,
	escape: deepEscape,
	unescape: deepUnescape
};