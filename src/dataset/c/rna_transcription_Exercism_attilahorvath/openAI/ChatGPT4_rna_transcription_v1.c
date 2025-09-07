#include "rna_transcription.h"
#include <stdlib.h>

char *to_rna(const char *dna) {
    if (!dna) return NULL;

    char *rna = (char*)malloc(strlen(dna) + 1);
    if (!rna) return NULL;

    for (size_t i = 0; dna[i] != '\0'; i++) {
        switch (dna[i]) {
        case 'G': rna[i] = 'C'; break;
        case 'C': rna[i] = 'G'; break;
        case 'T': rna[i] = 'A'; break;
        case 'A': rna[i] = 'U'; break;
        default:
            free(rna);
            return NULL;
        }
    }

    rna[strlen(dna)] = '\0';
    return rna;
}