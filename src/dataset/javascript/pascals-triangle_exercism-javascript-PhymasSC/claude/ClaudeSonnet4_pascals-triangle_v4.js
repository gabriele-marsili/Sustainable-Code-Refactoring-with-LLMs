const rows = number => {
	if (number <= 0) return [];
	
	const result = new Array(number);
	
	for (let i = 0; i < number; i++) {
		result[i] = new Array(i + 1);
		result[i][0] = 1;
		result[i][i] = 1;
		
		for (let j = 1; j < i; j++) {
			result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
		}
	}
	
	return result;
};

export { rows };