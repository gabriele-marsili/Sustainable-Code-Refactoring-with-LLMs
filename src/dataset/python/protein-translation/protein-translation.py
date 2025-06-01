#codons dictionary indicates the matching protein for the codon
codons = {'AUG' : 'Methionine', 'UUU' : 'Phenylalanine',
          'UUC' : 'Phenylalanine', 'UUA' : 'Leucine' ,
          'UUG' : 'Leucine', 'UCU' : 'Serine',
          'UCC' : 'Serine','UCA' : 'Serine', 
          'UCG' : 'Serine', 'UAU' : 'Tyrosine', 
          'UAC' : 'Tyrosine', 'UGU' : 'Cysteine',
          'UGC' : 'Cysteine', 'UGG' : 'Tryptophan'}
#stop set contains the STOP codon segments
stop = {'UAA', 'UAG', 'UGA'}
def proteins(strand):
    protein = []
    for e in range(0, len(strand), 3): 
        if strand[e:e+3] in stop:
           break
        #If the codon is not a stopping segement the it is added to the protein
        protein.append(codons[strand[e:e + 3]])
    return protein

        
