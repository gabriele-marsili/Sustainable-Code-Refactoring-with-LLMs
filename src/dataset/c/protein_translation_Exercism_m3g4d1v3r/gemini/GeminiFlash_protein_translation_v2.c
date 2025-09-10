#include "protein_translation.h"
#include <string.h>

int translate(proteins_t *data, codon_protein_t *map, const char *rna) {
    char codon[4];

    if (rna == NULL || *rna == '\0') {
        data->valid = true;
        return -1;
    }

    if (strlen(rna) < 3) {
        data->valid = false;
        return -1;
    }

    strncpy(codon, rna, 3);
    codon[3] = '\0';

    for (protein_t prot = 0; prot <= Stop; prot++) {
        for (size_t idx = 0; idx < MAX_CODONS_PER_PROTEIN; idx++) {
            if (map[prot].codons[idx][0] == '\0') {
                break;
            }
            if (strcmp(map[prot].codons[idx], codon) == 0) {
                if (prot == Stop) {
                    data->valid = true;
                    return -1;
                }
                data->proteins[data->count++] = prot;
                if (data->count >= MAX_PROTEINS) {
                    data->valid = false;
                    return -1;
                }
                return 0;
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

    codon_protein_t map[] = {{Methionine, {"AUG", ""}},
                             {Phenylalanine, {"UUU", "UUC", ""}},
                             {Leucine, {"UUA", "UUG", ""}},
                             {Serine, {"UCU", "UCC", "UCA", "UCG", ""}},
                             {Tyrosine, {"UAU", "UAC", ""}},
                             {Cysteine, {"UGU", "UGC", ""}},
                             {Tryptophan, {"UGG", ""}},
                             {Stop, {"UAA", "UAG", "UGA", ""}}};

    if (rna == NULL) {
        return data;
    }

    const char *rna_ptr = rna;
    int result;

    while ((result = translate(&data, map, rna_ptr)) == 0) {
        rna_ptr += 3;
        if (*rna_ptr == '\0') break;
    }

    return data;
}