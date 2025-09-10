#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct DNA_count { unsigned int G, T, A, C; };

static inline int inc_dna_count(struct DNA_count *cnt, char nuc) {
    switch(nuc) {
        case 'G': cnt->G++; return 0;
        case 'T': cnt->T++; return 0;
        case 'A': cnt->A++; return 0;
        case 'C': cnt->C++; return 0;
        default: return -1; // Unknown nucleotide
    }
}

char *count(const char *dna) {
    if (!dna) return NULL;

    struct DNA_count counter = { 0, 0, 0, 0 };
    for (const char *c = dna; *c; c++) {
        if (inc_dna_count(&counter, *c) != 0)
            return NULL; // Return NULL on invalid input
    }

    char *result = malloc(32); // Allocate enough space for the result
    if (!result) return NULL;

    snprintf(result, 32, "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    return result;
}