#include "rna_transcription.h"
#include <stdlib.h>

char *to_rna(const char *dna) {
    const char *p = dna;
    int len = 0;
    
    // Calculate length while validating input
    while (*p) {
        if (*p != 'G' && *p != 'C' && *p != 'T' && *p != 'A') {
            return NULL;
        }
        p++;
        len++;
    }
    
    char *rna = (char*)malloc(len + 1);
    if (!rna) return NULL;
    
    // Use lookup table for faster transcription
    static const char transcription[256] = {
        ['G'] = 'C',
        ['C'] = 'G', 
        ['T'] = 'A',
        ['A'] = 'U'
    };
    
    for (int i = 0; i < len; i++) {
        rna[i] = transcription[(unsigned char)dna[i]];
    }
    
    rna[len] = '\0';
    return rna;
}