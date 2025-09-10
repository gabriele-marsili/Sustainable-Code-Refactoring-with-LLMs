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

func FromCodon(codon string) string {
	if protein, ok := codonMap[codon]; ok {
		return protein
	}
	panic("Not a valid codon: " + codon)
}

func FromRNA(rna string) []string {
	codons := make([]string, 0, len(rna)/3)
	for i := 0; i < len(rna); i += 3 {
		if i+3 > len(rna) {
			break
		}
		codon := FromCodon(rna[i:i+3])
		if codon == "STOP" {
			return codons
		}
		codons = append(codons, codon)
	}
	return codons
}