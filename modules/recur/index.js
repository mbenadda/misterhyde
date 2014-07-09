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

// Escape strings to store them in YAML.
// They need to be contained in double quotes, especially the content one
// So double quotes inside of them need to be replaced with HTML code equivalent
var deepEscape = function (target) {

	for (var prop in target) {
		if (typeof target[prop] == 'object') {
			deepEscape(target[prop]);
		} else {
			if (typeof target[prop] == 'string') {
				target[prop] = target[prop].replace(/[^\\](")/g, '\\"');
			}	
		}
	}

	return target;
}

var deepUnescape = function (target) {

	for (var prop in target) {
		if (typeof target[prop] == 'object') {
			deepUnescape(target[prop]);
		} else {
			if (typeof target[prop] == 'string') {
				target[prop] = target[prop].replace(/(\\")/g, '"');
			}
		}
	}
	return target;
}

module.exports = {
	extendObject: extendObject,
	escape: deepEscape,
	unescape: deepUnescape
};