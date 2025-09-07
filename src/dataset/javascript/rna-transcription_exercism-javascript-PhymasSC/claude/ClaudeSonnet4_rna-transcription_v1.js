//
// This is only a SKELETON file for the 'RNA Transcription' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const DNA_TO_RNA = {
	G: "C",
	C: "G",
	T: "A",
	A: "U"
};

export const toRna = dnaSequence => {
	if (!dnaSequence) return "";
	
	let result = "";
	for (let i = 0; i < dnaSequence.length; i++) {
		result += DNA_TO_RNA[dnaSequence[i]];
	}
	return result;
};