#codons dictionary indicates the matching protein for the codon
codons = {'AUG' : 'Methionine', 'UUU' : 'Phenylalanine',
          'UUC' : 'Phenylalanine', 'UUA' : 'Leucine' ,
          'UUG' : 'Leucine', 'UCU' : 'Serine',
          'UCC' : 'Serine','UCA' : 'Serine', 
          'UCG' : 'Serine', 'UAU' : 'Tyrosine', 
          'UAC' : 'Tyrosine', 'UGU' : 'Cysteine',
          'UGC' : 'Cysteine', 'UGG' : 'Tryptophan'}
#stop set contains the STOP codon segments
stop = frozenset({'UAA', 'UAG', 'UGA'})

def proteins(strand):
    protein = []
    for e in range(0, len(strand), 3):
        codon = strand[e:e+3]
        if codon in stop:
            break
        if codon in codons:
            protein.append(codons[codon])
    return protein