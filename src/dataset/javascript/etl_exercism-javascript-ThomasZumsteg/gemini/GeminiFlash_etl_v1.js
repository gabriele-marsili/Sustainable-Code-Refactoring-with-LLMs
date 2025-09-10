var ETL = function() {}

ETL.prototype.transform = function(oldSturct) {
	/* Converts an old data structure to a new format */
	const newStruct = {};
	for (const key in oldSturct) {
		if (Object.hasOwn(oldSturct, key)) {
			const values = oldSturct[key];
			for (let i = 0; i < values.length; i++) {
				const val = values[i];
				newStruct[val.toLowerCase()] = parseInt(key, 10);
			}
		}
	}
	return newStruct;
}

export default ETL;