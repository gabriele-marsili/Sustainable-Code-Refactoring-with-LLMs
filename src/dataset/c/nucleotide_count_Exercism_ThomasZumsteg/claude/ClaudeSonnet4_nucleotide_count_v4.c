#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>

struct DNA_count { unsigned int G, T, A, C; };

int inc_dna_count(struct DNA_count *cnt, char nuc) {
    switch(nuc) {
        case 'G': cnt->G++; break;
        case 'T': cnt->T++; break;
        case 'A': cnt->A++; break;
        case 'C': cnt->C++; break;
        default: return -1;
    }
    return 0;
}

char *count(const char *dna) {
    struct DNA_count counter = {0, 0, 0, 0};
    
    for(const char *c = dna; *c; c++) {
        switch(*c) {
            case 'A': counter.A++; break;
            case 'C': counter.C++; break;
            case 'G': counter.G++; break;
            case 'T': counter.T++; break;
            default: {
                char *result = malloc(25);
                result[0] = '\0';
                return result;
            }
        }
    }
    
    char *result = malloc(25);
    sprintf(result, "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    return result;
}