#include "protein_translation.h"
#include <stdbool.h>

int translate(proteins_t *data, codon_protein_t *map, const char *rna) {
    if (!rna || rna[0] == '\0' || rna[1] == '\0' || rna[2] == '\0') {
        data->valid = false;
        return -1;
    }

    char codon[4] = {rna[0], rna[1], rna[2], '\0'};
    rna += 3;

    for (protein_t prot = 0; prot <= Stop; prot++) {
        for (size_t idx = 0; map[prot].codons[idx][0] != '\0'; idx++) {
            if (map[prot].codons[idx][0] == codon[0] &&
                map[prot].codons[idx][1] == codon[1] &&
                map[prot].codons[idx][2] == codon[2]) {
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

    const char *rna_ptr = rna;
    while (!data.valid && translate(&data, map, rna_ptr) == 0) {
        rna_ptr += 3;
    }

    return data;
}