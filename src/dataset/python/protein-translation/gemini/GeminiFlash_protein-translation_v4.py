codons = {'AUG': 'Methionine', 'UUU': 'Phenylalanine',
          'UUC': 'Phenylalanine', 'UUA': 'Leucine',
          'UUG': 'Leucine', 'UCU': 'Serine',
          'UCC': 'Serine', 'UCA': 'Serine',
          'UCG': 'Serine', 'UAU': 'Tyrosine',
          'UAC': 'Tyrosine', 'UGU': 'Cysteine',
          'UGC': 'Cysteine', 'UGG': 'Tryptophan'}
stop = {'UAA', 'UAG', 'UGA'}


def proteins(strand):
    protein = []
    for i in range(0, len(strand), 3):
        codon = strand[i:i + 3]
        if codon in stop:
            break
        protein.append(codons[codon])
    return protein