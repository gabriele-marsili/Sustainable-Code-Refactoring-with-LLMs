//
// This is only a SKELETON file for the 'RNA Transcription' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const translationMap = {
	G: 'C',
	C: 'G',
	T: 'A',
	A: 'U',
};

export const toRna = (string) => {
	let result = '';
	for (let i = 0; i < string.length; i++) {
		result += translationMap[string[i]];
	}
	return result;
};