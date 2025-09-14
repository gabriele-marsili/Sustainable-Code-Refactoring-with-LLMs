var ETL = function() {}

ETL.prototype.transform = function(oldSturct) {
	/* Converts an old data structure to a new format */
	var newStruct = {};
	var keys = Object.keys(oldSturct);
	
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var parsedKey = parseInt(key);
		var values = oldSturct[key];
		
		for (var j = 0; j < values.length; j++) {
			newStruct[values[j].toLowerCase()] = parsedKey;
		}
	}
	
	return newStruct;
}

export default ETL;