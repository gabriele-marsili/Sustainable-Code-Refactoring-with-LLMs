#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna) {
    size_t dna_len = strlen(dna);
    char *rna = malloc(sizeof(char) * (dna_len + 1));
    if (rna == NULL) return NULL;

    char *rna_ptr = rna;
    for (size_t i = 0; i < dna_len; ++i) {
        switch (dna[i]) {
            case 'G':
                *rna_ptr++ = 'C';
                break;
            case 'C':
                *rna_ptr++ = 'G';
                break;
            case 'T':
                *rna_ptr++ = 'A';
                break;
            case 'A':
                *rna_ptr++ = 'U';
                break;
            default:
                free(rna);
                return NULL;
        }
    }
    *rna_ptr = '\0';
    return rna;
}