#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 32

char *count(const char *dna) {
    if (!dna) return NULL;

    int counts[4] = {0}; // A, C, G, T
    for (const char *ptr = dna; *ptr; ++ptr) {
        switch (*ptr) {
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
            return NULL; // Invalid input, return NULL
        }
    }

    char *buffer = (char *)malloc(BUFFER_SIZE);
    if (!buffer) return NULL; // Handle memory allocation failure

    snprintf(buffer, BUFFER_SIZE, "A:%d C:%d G:%d T:%d",
             counts[0], counts[1], counts[2], counts[3]);
    return buffer;
}