#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna) {
    int dna_length = strlen(dna);
    char *rna = malloc(dna_length + 1);
    if (!rna) return NULL;

    for (int i = 0; i < dna_length; i++) {
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
    rna[dna_length] = '\0';
    return rna;
}