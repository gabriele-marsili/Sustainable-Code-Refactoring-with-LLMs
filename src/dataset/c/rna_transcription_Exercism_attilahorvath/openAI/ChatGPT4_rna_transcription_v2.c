#include "rna_transcription.h"
#include <stdlib.h>

char *to_rna(const char *dna) {
    if (!dna) return NULL;

    char *rna = strdup(dna);
    if (!rna) return NULL;

    for (char *p = rna; *p; ++p) {
        switch (*p) {
        case 'G':
            *p = 'C';
            break;
        case 'C':
            *p = 'G';
            break;
        case 'T':
            *p = 'A';
            break;
        case 'A':
            *p = 'U';
            break;
        default:
            free(rna);
            return NULL;
        }
    }

    return rna;
}