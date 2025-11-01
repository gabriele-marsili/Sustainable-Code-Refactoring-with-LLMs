#include "rna_transcription.h"

char *to_rna(const char *dna)
{
    if (!dna) return NULL;

    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    if (!rna) return NULL;

    for (size_t i = 0; i < len; i++) {
        switch (dna[i]) {
            case 'G': rna[i] = 'C'; break;
            case 'C': rna[i] = 'G'; break;
            case 'T': rna[i] = 'A'; break;
            case 'A': rna[i] = 'U'; break;
            default: free(rna); return NULL; // Handle invalid input
        }
    }
    rna[len] = '\0';
    return rna;
}