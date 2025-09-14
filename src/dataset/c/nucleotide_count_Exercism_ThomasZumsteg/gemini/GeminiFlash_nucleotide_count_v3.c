#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct DNA_count { unsigned int G, T, A, C; };

char *count(const char *dna) {
    struct DNA_count counter = { .G = 0, .C = 0, .A = 0, .T = 0};
    char *result = malloc(25);
    if (!result) return NULL;

    for(const char *c = dna; *c; c++) {
        switch(*c) {
            case 'G': counter.G++; break;
            case 'T': counter.T++; break;
            case 'A': counter.A++; break;
            case 'C': counter.C++; break;
            default:
                free(result);
                return NULL;
        }
    }

    int ret = snprintf(result, 25, "A:%u C:%u G:%u T:%u", counter.A, counter.C, counter.G, counter.T);
    if (ret < 0 || ret >= 25) {
        free(result);
        return NULL;
    }

    return result;
}