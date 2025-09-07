#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

char char_to_rna(char dna) {
    switch(dna) {
        case 'G': return 'C';
        case 'T': return 'A';
        case 'A': return 'U';
        case 'C': return 'G';
        default: return '\0';
    }
}

char *to_rna(const char *dna) {
    size_t dna_len = strlen(dna);
    char *rna = malloc(sizeof(char) * (dna_len + 1));
    if (!rna) return NULL;

    for (size_t i = 0; i < dna_len; ++i) {
        rna[i] = char_to_rna(dna[i]);
        if (rna[i] == '\0') {
            free(rna);
            return NULL;
        }
    }
    rna[dna_len] = '\0';
    return rna;
}