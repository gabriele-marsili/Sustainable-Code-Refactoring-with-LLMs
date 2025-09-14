#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct DNA_count { unsigned int G, T, A, C; };

char *count(const char *dna) {
    struct DNA_count counter = { .G = 0, .C = 0, .A = 0, .T = 0};
    
    // Early exit for NULL dna
    if (dna == NULL) {
        char *result = calloc(sizeof(char), 25);
        if (result != NULL) {
            sprintf(result, "A:0 C:0 G:0 T:0");
        }
        return result;
    }

    for(const char *c = dna; *c; c++) {
        switch(*c) {
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
    
    char *result = malloc(25);
    if (result == NULL) {
        return NULL; // Handle memory allocation failure
    }
    snprintf(result, 25, "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    return result;
}