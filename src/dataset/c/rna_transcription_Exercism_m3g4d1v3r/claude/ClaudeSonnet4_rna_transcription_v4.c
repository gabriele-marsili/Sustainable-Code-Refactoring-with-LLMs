#include "rna_transcription.h"

#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna) {
    if (!dna) return NULL;
    
    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    if (!rna) return NULL;
    
    char *rna_ptr = rna;
    const char *dna_ptr = dna;
    
    while (*dna_ptr) {
        switch (*dna_ptr) {
            case 'G': *rna_ptr = 'C'; break;
            case 'C': *rna_ptr = 'G'; break;
            case 'T': *rna_ptr = 'A'; break;
            case 'A': *rna_ptr = 'U'; break;
            default:
                free(rna);
                return NULL;
        }
        dna_ptr++;
        rna_ptr++;
    }
    
    *rna_ptr = '\0';
    return rna;
}