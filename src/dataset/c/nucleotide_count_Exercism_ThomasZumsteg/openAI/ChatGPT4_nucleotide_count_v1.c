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
    struct DNA_count counter = {0, 0, 0, 0};
    static char result[25]; // Use static buffer to avoid dynamic allocation
    memset(result, 0, sizeof(result));

    for (; *dna; dna++) {
        if (inc_dna_count(&counter, *dna) != 0) {
            result[0] = '\0'; // Return empty string on error
            return result;
        }
    }

    snprintf(result, sizeof(result), "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    return result;
}