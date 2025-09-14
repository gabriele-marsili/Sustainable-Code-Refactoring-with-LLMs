#include "protein_translation.h"

static const codon_protein_t map[] = {
    {Methionine, {"AUG", ""}},
    {Phenylalanine, {"UUU", "UUC", ""}},
    {Leucine, {"UUA", "UUG", ""}},
    {Serine, {"UCU", "UCC", "UCA", "UCG", ""}},
    {Tyrosine, {"UAU", "UAC", ""}},
    {Cysteine, {"UGU", "UGC", ""}},
    {Tryptophan, {"UGG", ""}},
    {Stop, {"UAA", "UAG", "UGA", ""}}
};

int translate(proteins_t *data, codon_protein_t *unused_map, const char *rna) {
    if (*rna == '\0') {
        data->valid = true;
        return (-1);
    }
    if (*(rna + 1) == '\0' || *(rna + 2) == '\0') {
        data->valid = false;
        return (-1);
    }

    const char codon[4] = {rna[0], rna[1], rna[2], '\0'};

    for (protein_t prot = 0; prot <= Stop; prot++) {
        const char *const *codons = map[prot].codons;
        for (size_t idx = 0; idx < MAX_CODONS_PER_PROTEIN && codons[idx][0] != '\0'; idx++) {
            if (codon[0] == codons[idx][0] && 
                codon[1] == codons[idx][1] && 
                codon[2] == codons[idx][2]) {
                data->proteins[data->count++] = prot;
                data->proteins[data->count] = '\0';
                if (prot == Stop) {
                    data->count--;
                    data->valid = true;
                }
                return (0);
            }
        }
    }
    data->valid = false;
    return (-1);
}

proteins_t proteins(const char *const rna) {
    proteins_t data = {0, false, {0}};
    const char *rna_ptr = rna;
    
    while (translate(&data, NULL, rna_ptr) == 0 && !data.valid) {
        rna_ptr += 3;
    }
    return data;
}