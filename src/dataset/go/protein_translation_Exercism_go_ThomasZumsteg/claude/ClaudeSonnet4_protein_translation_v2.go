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
	if protein, ok := codonMap[codeon]; ok {
		return protein
	}
	panic("Not a valid codon: " + codeon)
}

func FromRNA(rna string) []string {
	maxCodons := len(rna) / 3
	codons := make([]string, 0, maxCodons)
	
	for i := 0; i < len(rna)-2; i += 3 {
		if protein, ok := codonMap[rna[i:i+3]]; ok {
			if protein == "STOP" {
				return codons
			}
			codons = append(codons, protein)
		} else {
			panic("Not a valid codon: " + rna[i:i+3])
		}
	}
	return codons
}