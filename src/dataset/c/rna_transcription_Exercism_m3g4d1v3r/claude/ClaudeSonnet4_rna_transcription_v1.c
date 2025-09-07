#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

// the caller is responsible for freeing up
// the returned pointer
char *to_rna(const char *dna) {
    if (!dna) return NULL;
    
    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    if (!rna) return NULL;
    
    char *rna_ptr = rna;
    
    for (size_t i = 0; i < len; i++) {
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