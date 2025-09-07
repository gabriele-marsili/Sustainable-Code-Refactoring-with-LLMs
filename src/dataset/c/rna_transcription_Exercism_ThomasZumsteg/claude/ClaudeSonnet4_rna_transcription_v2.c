#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

static const char rna_map[256] = {
    ['G'] = 'C',
    ['T'] = 'A', 
    ['A'] = 'U',
    ['C'] = 'G'
};

char *to_rna(const char *dna) {
    size_t len = strlen(dna);
    char *rna = malloc(len + 1);
    if (!rna) return NULL;
    
    for (size_t i = 0; i < len; i++) {
        char mapped = rna_map[(unsigned char)dna[i]];
        if (!mapped) {
            free(rna);
            return NULL;
        }
        rna[i] = mapped;
    }
    rna[len] = '\0';
    return rna;
}