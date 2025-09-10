#include "protein_translation.h"

int translate(proteins_t *data, codon_protein_t *map, const char *rna) {
    if (rna[0] == '\0' || rna[1] == '\0' || rna[2] == '\0') {
        data->valid = (rna[0] == '\0');
        return -1;
    }

    char codon[4] = {rna[0], rna[1], rna[2], '\0'};

    for (protein_t prot = 0; prot <= Stop; prot++) {
        for (size_t idx = 0; map[prot].codons[idx][0] != '\0'; idx++) {
            if (strcmp(map[prot].codons[idx], codon) == 0) {
                if (prot == Stop) {
                    data->valid = true;
                    return 0;
                }
                data->proteins[data->count++] = prot;
                return 0;
            }
        }
    }
    data->valid = false;
    return -1;
}

proteins_t proteins(const char *const rna) {
    proteins_t data = {.count = 0, .valid = false};
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

    for (const char *rna_ptr = rna; !data.valid && *rna_ptr != '\0'; rna_ptr += 3) {
        if (translate(&data, map, rna_ptr) == -1) break;
    }

    return data;
}