package protein

var codonMap = map[string]string{
	"AUG": "Methionine",
	"UUU": "Phenylalanine", "UUC": "Phenylalanine",
	"UUA": "Leucine", "UUG": "Leucine",
	"UCU": "Serine", "UCC": "Serine", "UCA": "Serine", "UCG": "Serine",
	"UAU": "Tyrosine", "UAC": "Tyrosine",
	"UGU": "Cysteine", "UGC": "Cysteine",
	"UGG": "Tryptophan",
	"UAA": "STOP", "UAG": "STOP", "UGA": "STOP",
}

func FromCodon(codon string) string {
	if protein, exists := codonMap[codon]; exists {
		return protein
	}
	panic("Not a valid codon: " + codon)
}

func FromRNA(rna string) (codons []string) {
	for i := 0; i+3 <= len(rna); i += 3 {
		codon := FromCodon(rna[i : i+3])
		if codon == "STOP" {
			break
		}
		codons = append(codons, codon)
	}
	return
}