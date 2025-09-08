const rows = number => {
	if (number <= 0) return [];
	
	const res = new Array(number);
	
	for (let row = 0; row < number; row++) {
		res[row] = new Array(row + 1);
		res[row][0] = 1;
		res[row][row] = 1;
		
		for (let col = 1; col < row; col++) {
			res[row][col] = res[row - 1][col - 1] + res[row - 1][col];
		}
	}
	
	return res;
};

export { rows };