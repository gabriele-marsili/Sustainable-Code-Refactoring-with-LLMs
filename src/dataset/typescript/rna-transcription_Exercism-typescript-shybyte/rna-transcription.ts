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
            const nucleotide = dna[i]
            const rnaBase = DNA_TO_RNA[nucleotide]
            
            if (rnaBase === undefined) {
                throw 'Invalid input DNA.'
            }
            
            rna += rnaBase
        }
        
        return rna
    }
}

export default Transcriptor