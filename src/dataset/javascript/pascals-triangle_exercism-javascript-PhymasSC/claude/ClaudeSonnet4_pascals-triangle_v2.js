//
// This is only a SKELETON file for the 'Pascals Triangle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const rows = number => {
	if (number <= 0) return [];
	let res = new Array(number);
	
	for (let row = 0; row < number; row++) {
		res[row] = new Array(row + 1);
		res[row][0] = 1;
		res[row][row] = 1;
		
		for (let column = 1; column < row; column++) {
			res[row][column] = res[row - 1][column - 1] + res[row - 1][column];
		}
	}
	return res;
};