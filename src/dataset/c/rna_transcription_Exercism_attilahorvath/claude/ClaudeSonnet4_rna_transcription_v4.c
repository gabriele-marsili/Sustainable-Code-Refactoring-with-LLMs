#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna) {
    if (!dna) return NULL;
    
    const size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    if (!rna) return NULL;
    
    static const char lookup[256] = {
        ['G'] = 'C',
        ['C'] = 'G', 
        ['T'] = 'A',
        ['A'] = 'U'
    };
    
    for (size_t i = 0; i < len; i++) {
        const char mapped = lookup[(unsigned char)dna[i]];
        if (!mapped) {
            free(rna);
            return NULL;
        }
        rna[i] = mapped;
    }
    
    rna[len] = '\0';
    return rna;
}