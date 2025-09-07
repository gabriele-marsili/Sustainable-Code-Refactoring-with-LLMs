const DNA_TO_RNA = {
	G: "C",
	C: "G",
	T: "A",
	A: "U"
};

export const toRna = dnaSequence => {
	return dnaSequence ? dnaSequence.replace(/./g, char => DNA_TO_RNA[char]) : "";
};