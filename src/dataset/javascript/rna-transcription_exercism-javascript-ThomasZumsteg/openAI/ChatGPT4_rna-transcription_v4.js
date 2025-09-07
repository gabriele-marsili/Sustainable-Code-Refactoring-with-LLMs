var DnaTranscriber = function() {};

DnaTranscriber.prototype.toRna = function(dna) {
	const dnaToRna = { G: 'C', C: 'G', T: 'A', A: 'U' };
	return Array.from(dna, nucleotide => dnaToRna[nucleotide]).join('');
};

export default DnaTranscriber;