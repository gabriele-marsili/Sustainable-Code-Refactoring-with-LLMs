var DnaTranscriber = function() {};

// Pre-computed mapping to avoid recreation on each call
const DNA_TO_RNA_MAP = { 'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U' };

DnaTranscriber.prototype.toRna = function(dna) {
	var result = '';
	for (var i = 0; i < dna.length; i++) {
		result += DNA_TO_RNA_MAP[dna[i]];
	}
	return result;
}

export default DnaTranscriber;