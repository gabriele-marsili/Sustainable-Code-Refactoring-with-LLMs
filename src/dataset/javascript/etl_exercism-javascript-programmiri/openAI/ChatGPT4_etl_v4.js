export const transform = (oldMap) => {
	const acc = {};
	for (const [key, letters] of Object.entries(oldMap)) {
		const value = Number(key);
		for (const letter of letters) {
			acc[letter.toLowerCase()] = value;
		}
	}
	return acc;
};