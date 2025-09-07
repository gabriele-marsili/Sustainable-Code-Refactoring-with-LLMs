#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

char char_to_rna(char dna) {
    switch(dna) {
        case 'G': return 'C';
        case 'T': return 'A';
        case 'A': return 'U';
        case 'C': return 'G';
        default: return 0;
    }
}

char *to_rna(const char *dna) {
    size_t len = strlen(dna);
    char *rna = malloc(len + 1); // Allocate only what's needed, including null terminator
    if (!rna) return NULL; // Check for allocation failure

    for (size_t i = 0; i < len; i++) {
        rna[i] = char_to_rna(dna[i]);
        if (rna[i] == 0) { // Invalid character
            free(rna); // Free allocated memory on error
            return NULL;
        }
    }
    rna[len] = '\0'; // Null-terminate the string
    return rna;
}