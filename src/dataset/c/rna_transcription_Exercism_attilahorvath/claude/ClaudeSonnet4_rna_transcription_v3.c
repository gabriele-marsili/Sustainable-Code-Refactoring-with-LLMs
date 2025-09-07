#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

char *to_rna(const char *dna) {
    if (!dna) return NULL;
    
    const int len = strlen(dna);
    char *rna = (char*)malloc(len + 1);
    if (!rna) return NULL;
    
    static const char transcription_map[256] = {
        ['G'] = 'C',
        ['C'] = 'G', 
        ['T'] = 'A',
        ['A'] = 'U'
    };
    
    for (int i = 0; i < len; i++) {
        const char transcribed = transcription_map[(unsigned char)dna[i]];
        if (!transcribed) {
            free(rna);
            return NULL;
        }
        rna[i] = transcribed;
    }
    
    rna[len] = '\0';
    return rna;
}