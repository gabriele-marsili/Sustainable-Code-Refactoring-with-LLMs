#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

// the caller is responsible for freeing up
// the returned pointer
char *to_rna(const char *dna) {
    if (dna == NULL) return NULL;

    size_t dna_length = strlen(dna);
    char *rna = malloc(dna_length + 1);
    if (rna == NULL) return NULL;

    for (size_t i = 0; i < dna_length; i++) {
        switch (dna[i]) {
            case 'G':
                rna[i] = 'C';
                break;
            case 'C':
                rna[i] = 'G';
                break;
            case 'T':
                rna[i] = 'A';
                break;
            case 'A':
                rna[i] = 'U';
                break;
            default:
                free(rna);
                return NULL;
        }
    }
    rna[dna_length] = '\0';
    return rna;
}