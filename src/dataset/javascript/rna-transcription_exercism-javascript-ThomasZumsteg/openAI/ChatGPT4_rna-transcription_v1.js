var DnaTranscriber = function() {};

DnaTranscriber.prototype.toRna = function(dna) {
	/* Translates dna to RNA */
	const dnaToRna = { G: 'C', C: 'G', T: 'A', A: 'U' };
	return Array.from(dna, nucleotide => dnaToRna[nucleotide]).join('');
};

export default DnaTranscriber;