#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

char* to_rna(const char* dna)
{
    if (dna == NULL) {
        return NULL;
    }

    size_t dna_len = strlen(dna);
    char *res = (char*) malloc(dna_len + 1);
    if (res == NULL) {
        return NULL;
    }

    for (size_t i = 0; i < dna_len; ++i) {
        switch (dna[i]) {
            case 'G':
                res[i] = 'C';
                break;
            case 'C':
                res[i] = 'G';
                break;
            case 'T':
                res[i] = 'A';
                break;
            case 'A':
                res[i] = 'U';
                break;
            default:
                free(res);
                return NULL;
        }
    }
    res[dna_len] = '\0';

    return res;
}