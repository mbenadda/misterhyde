var yaml = require('js-yaml');
var fs   = require('fs');


function parse (file, callback) {

	fs.stat(file, function (err, stats) {
		if (stats.isDirectory()) {
			callback(null, 'dir');
		} else if (stats.isFile()) {

			var data = fs.readFileSync(file, 'utf-8');
			var docs = [];

			try {
				yaml.safeLoadAll(data, function (doc) {
					docs.push(doc);
				});
				
			} catch (e) {
				docs.push(data);
			}
			callback(null, docs);
		}
	})
}
	
module.exports = {
	parse: parse
}