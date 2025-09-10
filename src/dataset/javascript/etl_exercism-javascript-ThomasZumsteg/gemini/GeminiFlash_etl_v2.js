var ETL = function() {}

ETL.prototype.transform = function(oldSturct) {
	/* Converts an old data structure to a new format */
	const newStruct = {};
	for (const key in oldSturct) {
		if (Object.hasOwn(oldSturct, key)) {
			const points = parseInt(key, 10); // Parse once per key
			const letters = oldSturct[key];
			for (let i = 0; i < letters.length; i++) {
				newStruct[letters[i].toLowerCase()] = points;
			}
		}
	}
	return newStruct;
}

export default ETL;