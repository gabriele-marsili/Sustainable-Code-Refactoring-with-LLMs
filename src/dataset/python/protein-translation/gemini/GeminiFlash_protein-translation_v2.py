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
        try:
            protein.append(codons[codon])
        except KeyError:
            # Handle cases where the codon is not in the dictionary, if needed.
            # For example, you could log an error or return an empty list.
            # For now, we'll just ignore it and continue.  This preserves original functionality
            pass
    return protein