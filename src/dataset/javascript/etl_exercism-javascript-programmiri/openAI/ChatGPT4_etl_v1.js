export const transform = (oldMap) => {
	const result = {};
	for (const [key, letters] of Object.entries(oldMap)) {
		const value = Number(key);
		for (const letter of letters) {
			result[letter.toLowerCase()] = value;
		}
	}
	return result;
};