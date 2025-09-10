var ETL = function() {}

ETL.prototype.transform = function(oldStruct) {
	const newStruct = {};
	for (const key in oldStruct) {
		if (Object.hasOwn(oldStruct, key)) {
			const points = parseInt(key, 10);
			const letters = oldStruct[key];
			for (let i = 0; i < letters.length; i++) {
				const letter = letters[i].toLowerCase();
				newStruct[letter] = points;
			}
		}
	}
	return newStruct;
}

export default ETL;