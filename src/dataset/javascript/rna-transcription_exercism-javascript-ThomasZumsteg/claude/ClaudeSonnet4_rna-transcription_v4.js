var DnaTranscriber = function() {};

DnaTranscriber.prototype.toRna = function(dna) {
	var result = '';
	for (var i = 0; i < dna.length; i++) {
		var nucleotide = dna[i];
		switch (nucleotide) {
			case 'G': result += 'C'; break;
			case 'C': result += 'G'; break;
			case 'T': result += 'A'; break;
			case 'A': result += 'U'; break;
		}
	}
	return result;
};

export default DnaTranscriber;