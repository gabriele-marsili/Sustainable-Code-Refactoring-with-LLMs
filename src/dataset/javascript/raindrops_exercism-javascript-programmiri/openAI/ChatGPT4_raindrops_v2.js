export const convert = (input) => {
	const divisible = [
		[input % 3 === 0, 'Pling'],
		[input % 5 === 0, 'Plang'],
		[input % 7 === 0, 'Plong'],
	];

	const result = divisible.reduce((acc, [condition, sound]) => condition ? acc + sound : acc, '');

	return result || String(input);
};
