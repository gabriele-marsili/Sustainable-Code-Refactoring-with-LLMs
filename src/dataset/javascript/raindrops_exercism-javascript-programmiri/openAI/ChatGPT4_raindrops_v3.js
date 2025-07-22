export const convert = (input) => {
	const divs = [(3, 'Pling'), (5, 'Plang'), (7, 'Plong')];
	let result = '';

	for (let i = 0; i < 3; i++) {
		const n = 3 + i * 2;
		if (input % n === 0) result += divs[i][1];
	}

	return result || String(input);
};
