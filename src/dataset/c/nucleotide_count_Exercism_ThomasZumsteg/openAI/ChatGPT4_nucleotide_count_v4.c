#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct DNA_count { unsigned int G, T, A, C; };

int inc_dna_count(struct DNA_count *cnt, char nuc) {
    if (nuc == 'G') cnt->G++;
    else if (nuc == 'T') cnt->T++;
    else if (nuc == 'A') cnt->A++;
    else if (nuc == 'C') cnt->C++;
    else return -1; // Unknown nucleotide
    return 0;
}

char *count(const char *dna) {
    struct DNA_count counter = {0, 0, 0, 0};
    size_t dna_len = strlen(dna);
    for (size_t i = 0; i < dna_len; i++) {
        if (inc_dna_count(&counter, dna[i]) != 0) {
            return strdup(""); // Return empty string on error
        }
    }
    char *result = malloc(25);
    snprintf(result, 25, "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    return result;
}