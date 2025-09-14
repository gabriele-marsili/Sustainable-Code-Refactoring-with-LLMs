package protein

var codonMap = map[string]string{
	"AUG": "Methionine",
	"UUU": "Phenylalanine",
	"UUC": "Phenylalanine",
	"UUA": "Leucine",
	"UUG": "Leucine",
	"UCU": "Serine",
	"UCC": "Serine",
	"UCA": "Serine",
	"UCG": "Serine",
	"UAU": "Tyrosine",
	"UAC": "Tyrosine",
	"UGU": "Cysteine",
	"UGC": "Cysteine",
	"UGG": "Tryptophan",
	"UAA": "STOP",
	"UAG": "STOP",
	"UGA": "STOP",
}

func FromCodon(codeon string) string {
	if protein, exists := codonMap[codeon]; exists {
		return protein
	}
	panic("Not a valid codon: " + codeon)
}

func FromRNA(rna string) (codons []string) {
	capacity := len(rna) / 3
	if capacity > 0 {
		codons = make([]string, 0, capacity)
	}
	
	for i := 0; i < len(rna)-2; i += 3 {
		if protein, exists := codonMap[rna[i:i+3]]; exists {
			if protein == "STOP" {
				return
			}
			codons = append(codons, protein)
		} else {
			panic("Not a valid codon: " + rna[i:i+3])
		}
	}
	return
}