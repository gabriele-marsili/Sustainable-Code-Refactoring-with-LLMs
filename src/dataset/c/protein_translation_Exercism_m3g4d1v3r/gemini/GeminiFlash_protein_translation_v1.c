#include "protein_translation.h"
#include <string.h>

int translate(proteins_t *data, codon_protein_t *map, const char *rna) {
    if (rna == NULL || *rna == '\0') {
        data->valid = true;
        return -1;
    }

    if (strlen(rna) < 3) {
        data->valid = false;
        return -1;
    }

    char codon[4];
    strncpy(codon, rna, 3);
    codon[3] = '\0';

    for (protein_t prot = 0; prot <= Stop; prot++) {
        for (size_t idx = 0; idx < MAX_CODONS_PER_PROTEIN; idx++) {
            const char *current_codon = map[prot].codons[idx];
            if (current_codon[0] == '\0') {
                break;
            }
            if (strncmp(current_codon, codon, 3) == 0) {
                if (prot == Stop) {
                    data->valid = true;
                    return -1;
                }
                if (data->count < MAX_PROTEINS) {
                    data->proteins[data->count++] = prot;
                    data->proteins[data->count] = '\0';
                    return 0;
                } else {
                    data->valid = false;
                    return -1;
                }
            }
        }
    }

    data->valid = false;
    return -1;
}

proteins_t proteins(const char *const rna) {
    proteins_t data;
    data.count = 0;
    data.valid = false;

    codon_protein_t map[] = {
        {Methionine, {"AUG", ""}},
        {Phenylalanine, {"UUU", "UUC", ""}},
        {Leucine, {"UUA", "UUG", ""}},
        {Serine, {"UCU", "UCC", "UCA", "UCG", ""}},
        {Tyrosine, {"UAU", "UAC", ""}},
        {Cysteine, {"UGU", "UGC", ""}},
        {Tryptophan, {"UGG", ""}},
        {Stop, {"UAA", "UAG", "UGA", ""}}
    };

    const char *rna_ptr = rna;
    while (rna_ptr != NULL && *rna_ptr != '\0') {
        if (translate(&data, map, rna_ptr) != 0) {
            break;
        }
        rna_ptr += 3;
    }

    return data;
}