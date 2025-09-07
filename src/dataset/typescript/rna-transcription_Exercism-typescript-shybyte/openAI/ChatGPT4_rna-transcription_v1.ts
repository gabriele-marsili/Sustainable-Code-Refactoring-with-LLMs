const DNA_TO_RNA = new Map<string, string>([
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U']
]);

class Transcriptor {
    toRna(dna: string) {
        let rna = '';
        for (const nucleotide of dna) {
            const transcribed = DNA_TO_RNA.get(nucleotide);
            if (!transcribed) {
                throw 'Invalid input DNA.';
            }
            rna += transcribed;
        }
        return rna;
    }
}

export default Transcriptor;