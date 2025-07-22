export const convert = (input) => {
	const divisibleBy = (n) => input % n === 0;

	if (!divisibleBy(3) && !divisibleBy(5) && !divisibleBy(7)) return input.toString();

	let result = '';
	if (divisibleBy(3)) result += 'Pling';
	if (divisibleBy(5)) result += 'Plang';
	if (divisibleBy(7)) result += 'Plong';

	return result;
};
