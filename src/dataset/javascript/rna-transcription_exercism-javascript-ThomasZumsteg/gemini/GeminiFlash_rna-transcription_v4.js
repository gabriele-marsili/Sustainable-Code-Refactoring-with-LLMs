var DnaTranscriber = function() {};

DnaTranscriber.prototype.toRna = function(dna) {
	const dnaToRna = {
		'G': 'C',
		'C': 'G',
		'T': 'A',
		'A': 'U'
	};

	let rna = "";
	for (let i = 0; i < dna.length; i++) {
		rna += dnaToRna[dna[i]];
	}
	return rna;
}

export default DnaTranscriber;