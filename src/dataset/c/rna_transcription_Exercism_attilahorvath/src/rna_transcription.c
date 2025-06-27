#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna) {
    int len = strlen(dna);
    char *rna = (char*)malloc(len + 1);
    int i;

    for (i = 0; i < len; i++) {
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

    rna[i] = '\0';
    return rna;
}
