#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

char* to_rna(const char* dna)
{
    if (dna == NULL) {
        return NULL;
    }

    size_t dna_len = strlen(dna);
    char *rna = (char*)malloc(dna_len + 1);

    if (rna == NULL) {
        return NULL;
    }

    for (size_t i = 0; i < dna_len; ++i) {
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

    rna[dna_len] = '\0';
    return rna;
}