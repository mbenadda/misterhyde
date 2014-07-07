var _ = require('underscore');

var recurExtendObject = function (target, source) {
	for (var prop in source) {
		if (prop in target && typeof target[prop] == 'object') {
			recurExtendObject(target[prop], source[prop]);
		} else {
			target[prop] = source[prop];
		}
	}
	return target;
}

module.exports = recurExtendObject;