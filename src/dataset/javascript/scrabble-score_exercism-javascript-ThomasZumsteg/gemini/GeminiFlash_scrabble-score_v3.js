/* Value of letters in scrabble */
const letterVal = new Uint8Array(26);
letterVal[0] = 1;  // A
letterVal[4] = 1;  // E
letterVal[8] = 1;  // I
letterVal[14] = 1; // O
letterVal[20] = 1; // U
letterVal[11] = 1; // L
letterVal[13] = 1; // N
letterVal[17] = 1; // R
letterVal[18] = 1; // S
letterVal[19] = 1; // T
letterVal[3] = 2;  // D
letterVal[6] = 2;  // G
letterVal[1] = 3;  // B
letterVal[2] = 3;  // C
letterVal[12] = 3; // M
letterVal[15] = 3; // P
letterVal[5] = 4;  // F
letterVal[7] = 4;  // H
letterVal[21] = 4; // V
letterVal[22] = 4; // W
letterVal[24] = 4; // Y
letterVal[10] = 5; // K
letterVal[9] = 8;  // J
letterVal[23] = 8; // X
letterVal[16] = 10; // Q
letterVal[25] = 10; // Z


function score(word) {
	/* The score of a scrabble word */
	// Words with invalid characters are worth zero
	if (!word || !/^[a-zA-Z]+$/.test(word)) {
		return 0;
	}

	let sum = 0;
	const upperWord = word.toUpperCase();
	for (let i = 0; i < upperWord.length; i++) {
		const charCode = upperWord.charCodeAt(i);
		sum += letterVal[charCode - 65];
	}
	return sum;
};

export default score;