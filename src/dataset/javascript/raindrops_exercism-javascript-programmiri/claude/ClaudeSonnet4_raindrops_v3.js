export const convert = (input) => {
	const mod3 = input % 3 === 0;
	const mod5 = input % 5 === 0;
	const mod7 = input % 7 === 0;

	if (mod3 || mod5 || mod7) {
		return (mod3 ? 'Pling' : '') + (mod5 ? 'Plang' : '') + (mod7 ? 'Plong' : '');
	}

	return input.toString();
};