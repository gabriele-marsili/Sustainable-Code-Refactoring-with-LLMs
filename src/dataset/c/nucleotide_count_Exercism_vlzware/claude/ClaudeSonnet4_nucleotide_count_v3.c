#include "nucleotide_count.h"
#include <stdlib.h>
#include <stdio.h>

char *count(const char *dna_strand)
{
    if (dna_strand == NULL) {
        char *error = malloc(1);
        if (error) *error = '\0';
        return error;
    }

    int counts[4] = {0}; // A, C, G, T
    const char *tmp = dna_strand;
    
    while (*tmp) {
        switch (*tmp++) {
        case 'A':
            counts[0]++;
            break;
        case 'C':
            counts[1]++;
            break;
        case 'G':
            counts[2]++;
            break;
        case 'T':
            counts[3]++;
            break;
        default:
            {
                char *error = malloc(1);
                if (error) *error = '\0';
                return error;
            }
        }
    }

    char *res = malloc(32);
    if (res == NULL) {
        char *error = malloc(1);
        if (error) *error = '\0';
        return error;
    }

    sprintf(res, "A:%i C:%i G:%i T:%i", counts[0], counts[1], counts[2], counts[3]);
    return res;
}