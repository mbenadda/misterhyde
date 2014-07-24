var _ = require('underscore');

// Unlike the underscore one, accepts only one source
var extendObject = function (target, source) {
	for (var prop in source) {
		if (prop in target && typeof target[prop] == 'object' && !(target[prop] instanceof Array)) {
			extendObject(target[prop], source[prop]);
		} else {
			target[prop] = source[prop];
		}
	}
	return target;
}

// Escape strings to store them in YAML.
// We need to remove colons (:) as they get interpreted by YAML as list initialization chars
var deepEscape = function (target) {

	for (var prop in target) {
		if (typeof target[prop] == 'object') {
			deepEscape(target[prop]);
		} else {
			if (typeof target[prop] == 'string') {
				target[prop] = target[prop].replace(/:/g, '&#58;');
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
				target[prop] = target[prop].replace(/(&#58;)/g, ':');
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