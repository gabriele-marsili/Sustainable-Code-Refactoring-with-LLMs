export const transform = (oldMap) => {
	const result = {};
	for (const key in oldMap) {
		const numKey = +key;
		const letters = oldMap[key];
		for (let i = 0; i < letters.length; i++) {
			result[letters[i].toLowerCase()] = numKey;
		}
	}
	return result;
};