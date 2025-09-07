#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

static const char DNA_TO_RNA[256] = {
    ['G'] = 'C',
    ['T'] = 'A', 
    ['A'] = 'U',
    ['C'] = 'G'
};

char char_to_rna(char dna) {
    return DNA_TO_RNA[(unsigned char)dna];
}

char *to_rna(const char *dna) {
    if (!dna) return NULL;
    
    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    if (!rna) return NULL;
    
    for (size_t i = 0; i < len; i++) {
        char converted = DNA_TO_RNA[(unsigned char)dna[i]];
        if (converted == 0) {
            free(rna);
            return NULL;
        }
        rna[i] = converted;
    }
    rna[len] = '\0';
    
    return rna;
}