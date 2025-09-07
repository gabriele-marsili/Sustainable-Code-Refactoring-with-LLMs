const DNA_TO_RNA = {
	G: "C",
	C: "G",
	T: "A",
	A: "U"
};

export const toRna = dnaSequence => {
	let rnaSequence = "";
	for (let i = 0; i < dnaSequence.length; i++) {
		rnaSequence += DNA_TO_RNA[dnaSequence[i]];
	}
	return rnaSequence;
};