export const transform = (oldMap) => {
	const result = {};
	for (const score in oldMap) {
		const numScore = Number(score);
		const letters = oldMap[score];
		for (let i = 0; i < letters.length; i++) {
			result[letters[i].toLowerCase()] = numScore;
		}
	}
	return result;
};