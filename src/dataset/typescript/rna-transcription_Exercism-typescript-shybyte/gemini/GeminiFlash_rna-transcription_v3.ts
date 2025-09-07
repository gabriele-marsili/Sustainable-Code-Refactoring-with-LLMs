const DNA_TO_RNA: { [dna: string]: string } = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
}

class Transcriptor {
    toRna(dna: string) {
        let rna = "";
        for (let i = 0; i < dna.length; i++) {
            const nucleotide = dna[i];
            const rnaNucleotide = DNA_TO_RNA[nucleotide];
            if (!rnaNucleotide) {
                throw 'Invalid input DNA.';
            }
            rna += rnaNucleotide;
        }
        return rna;
    }
}

export default Transcriptor