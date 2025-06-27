#include "protein_translation.h"

int translate(proteins_t *data, codon_protein_t *map, const char *rna) {
    char codon[4];

    if (*rna == '\0') {
        data->valid = true;
        return (-1);
    }
    if (*(rna + 1) == '\0' || *(rna + 2) == '\0') {
        data->valid = false;
        return (-1);
    }
    codon[0] = *rna++;
    codon[1] = *rna++;
    codon[2] = *rna++;
    codon[3] = '\0';

    for (protein_t prot = 0; prot <= Stop; prot++) {
        for (size_t idx = 0; idx < MAX_CODONS_PER_PROTEIN; idx++) {
            if (strcmp(map[prot].codons[idx], codon) == 0) {
                data->proteins[data->count++] = prot;
                data->proteins[data->count] = '\0';
                if (prot == Stop) {
                    data->count--;
                    data->valid = true;
                }
                return (0);
            }
            if (strcmp(map[prot].codons[idx], "") == 0) break;
        }
    }
    data->valid = false;
    return (-1);
}

proteins_t proteins(const char *const rna) {
    const char *rna_ptr;
    proteins_t data;
    codon_protein_t map[] = {{Methionine, {"AUG", ""}},
                             {Phenylalanine, {"UUU", "UUC", ""}},
                             {Leucine, {"UUA", "UUG", ""}},
                             {Serine, {"UCU", "UCC", "UCA", "UCG", ""}},
                             {Tyrosine, {"UAU", "UAC", ""}},
                             {Cysteine, {"UGU", "UGC", ""}},
                             {Tryptophan, {"UGG", ""}},
                             {Stop, {"UAA", "UAG", "UGA", ""}}};

    rna_ptr = rna;
    data.count = 0;
    data.valid = false;
    while (translate(&data, map, rna_ptr) == 0 && data.valid == false) {
        rna_ptr = rna_ptr + 3;
    }
    return (data);
}
