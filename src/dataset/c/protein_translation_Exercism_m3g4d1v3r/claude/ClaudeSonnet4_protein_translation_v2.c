#include "protein_translation.h"

int translate(proteins_t *data, codon_protein_t *map, const char *rna) {
    if (*rna == '\0') {
        data->valid = true;
        return (-1);
    }
    if (*(rna + 1) == '\0' || *(rna + 2) == '\0') {
        data->valid = false;
        return (-1);
    }

    // Direct 3-byte comparison without string copy
    for (protein_t prot = 0; prot <= Stop; prot++) {
        for (size_t idx = 0; idx < MAX_CODONS_PER_PROTEIN; idx++) {
            const char *codon_ptr = map[prot].codons[idx];
            if (*codon_ptr == '\0') break;
            
            if (rna[0] == codon_ptr[0] && rna[1] == codon_ptr[1] && rna[2] == codon_ptr[2]) {
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
    static const codon_protein_t map[] = {{Methionine, {"AUG", ""}},
                                         {Phenylalanine, {"UUU", "UUC", ""}},
                                         {Leucine, {"UUA", "UUG", ""}},
                                         {Serine, {"UCU", "UCC", "UCA", "UCG", ""}},
                                         {Tyrosine, {"UAU", "UAC", ""}},
                                         {Cysteine, {"UGU", "UGC", ""}},
                                         {Tryptophan, {"UGG", ""}},
                                         {Stop, {"UAA", "UAG", "UGA", ""}}};

    proteins_t data = {0, false, {0}};
    const char *rna_ptr = rna;
    
    while (translate(&data, (codon_protein_t*)map, rna_ptr) == 0 && !data.valid) {
        rna_ptr += 3;
    }
    return data;
}