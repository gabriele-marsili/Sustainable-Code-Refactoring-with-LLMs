var ETL = function() {}

ETL.prototype.transform = function(oldSturct) {
	const newStruct = {};
	const keys = Object.keys(oldSturct);
	
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const parsedKey = parseInt(key, 10);
		const values = oldSturct[key];
		
		for (let j = 0; j < values.length; j++) {
			newStruct[values[j].toLowerCase()] = parsedKey;
		}
	}
	
	return newStruct;
}

export default ETL;