

var save = function (type, object, callback) {

	switch (type) {

		case 'post':
			require('./_post')(object, callback);
			break;

		default:
			console.log('Could not identify type to save');
			break;	

	}


}

module.exports = save;