const combination = (totalNumberOfObjects, numberOfCurrentObject) => {
	let result = 1;
	for (let i = 0; i < numberOfCurrentObject; i++) {
		result *= (totalNumberOfObjects - i) / (i + 1);
	}
	return result;
};

export const rows = number => {
	if (number <= 0) return [];
	let res = [];
	for (let row = 0; row < number; row++) {
		let currentRow = [1];
		for (let column = 1; column <= row; column++) {
			currentRow.push(combination(row, column));
		}
		res.push(currentRow);
	}
	return res;
};