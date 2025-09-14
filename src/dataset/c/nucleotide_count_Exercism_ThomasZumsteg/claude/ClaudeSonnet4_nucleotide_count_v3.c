#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>

struct DNA_count { unsigned int G, T, A, C; };

static inline int inc_dna_count(struct DNA_count *cnt, char nuc) {
    switch(nuc) {
        case 'G': cnt->G++; return 0;
        case 'T': cnt->T++; return 0;
        case 'A': cnt->A++; return 0;
        case 'C': cnt->C++; return 0;
        default: return -1;
    }
}

char *count(const char *dna) {
    struct DNA_count counter = {0, 0, 0, 0};
    
    for(const char *c = dna; *c; c++) {
        if(inc_dna_count(&counter, *c) != 0) {
            char *result = malloc(25);
            if(result) result[0] = '\0';
            return result;
        }
    }
    
    char *result = malloc(25);
    if(!result) return NULL;
    
    sprintf(result, "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    return result;
}