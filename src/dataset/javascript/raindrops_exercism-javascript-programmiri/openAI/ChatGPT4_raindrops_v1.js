export const convert = (input) => {
	const divisibleBy = [(3, 'Pling'), (5, 'Plang'), (7, 'Plong')];
	let result = '';

	for (let i = 0; i < 3; i++) {
		const [num, sound] = divisibleBy[i];
		if (input % num === 0) result += sound;
	}

	return result || String(input);
};
