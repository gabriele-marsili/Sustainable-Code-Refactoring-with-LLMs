function checkForErrors(leftStrand, rightStrand) {
	if (leftStrand.length !== rightStrand.length) {
		if (!leftStrand.length) throw Error('left strand must not be empty');
		if (!rightStrand.length) throw Error('right strand must not be empty');
		throw Error('left and right strands must be of equal length');
	}
}

export const compute = (leftStrand, rightStrand) => {
	checkForErrors(leftStrand, rightStrand);

	let differences = 0;
	for (let i = 0; i < leftStrand.length; i++) {
		if (leftStrand[i] !== rightStrand[i]) differences++;
	}
	return differences;
};