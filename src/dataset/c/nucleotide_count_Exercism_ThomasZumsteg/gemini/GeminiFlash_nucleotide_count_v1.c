#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct DNA_count { unsigned int G, T, A, C; };

char *count(const char *dna) {
    struct DNA_count counter = { .G = 0, .C = 0, .A = 0, .T = 0};
    size_t dna_len = strlen(dna);
    for(size_t i = 0; i < dna_len; ++i) {
        switch(dna[i]) {
            case 'G': counter.G++; break;
            case 'T': counter.T++; break;
            case 'A': counter.A++; break;
            case 'C': counter.C++; break;
            default: {
                char *result = calloc(sizeof(char), 25);
                return result;
            }
        }
    }

    char *result = malloc(sizeof(char) * 25);
    if (result == NULL) {
        return NULL;
    }
    snprintf(result, 25, "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    return result;
}