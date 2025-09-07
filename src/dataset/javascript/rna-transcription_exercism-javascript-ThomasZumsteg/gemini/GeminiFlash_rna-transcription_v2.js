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
        const nucleotide = dna[i];
        rna += dnaToRna[nucleotide] || '';
    }
    return rna;
};

export default DnaTranscriber;