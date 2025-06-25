const DNA_TO_RNA: { [dna: string]: string } = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
}

class Transcriptor {
    toRna(dna: string) {
        const rna = dna
            .split('')
            .map((nucleotide) => DNA_TO_RNA[nucleotide])
            .join('')

        if (rna.length !== dna.length) {
            throw 'Invalid input DNA.'
        }

        return rna
    }
}

export default Transcriptor