var async = require('async');
var yaml = require('../_yaml');

var settings = function (index, callback) {
	
	async.filter(index, require('../_filter')('_settings'), function (_settings_index) {
		yaml.parse(_settings_index[0], function (err, _settings) {
			if (err) throw err;

			callback(null, _settings)
		})
	})

	
}

module.exports = settings;