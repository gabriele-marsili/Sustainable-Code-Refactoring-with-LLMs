const DNA_TO_RNA: { [dna: string]: string } = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
}

class Transcriptor {
    toRna(dna: string): string {
        let rna = ''
        
        for (let i = 0; i < dna.length; i++) {
            const nucleotide = DNA_TO_RNA[dna[i]]
            if (nucleotide === undefined) {
                throw 'Invalid input DNA.'
            }
            rna += nucleotide
        }
        
        return rna
    }
}

export default Transcriptor