#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

static const char dna_to_rna_map[256] = {
    ['G'] = 'C',
    ['C'] = 'G',
    ['T'] = 'A',
    ['A'] = 'U'
};

char* to_rna(const char* dna)
{
    if (dna == NULL)
        return NULL;

    size_t len = strlen(dna);
    char *res = (char*) malloc(len + 1);
    if (res == NULL)
        return NULL;

    for (size_t i = 0; i < len; i++) {
        char rna_char = dna_to_rna_map[(unsigned char)dna[i]];
        if (rna_char == 0) {
            free(res);
            return NULL;
        }
        res[i] = rna_char;
    }
    res[len] = '\0';

    return res;
}