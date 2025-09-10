#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 32

char *count(const char *dna) {
    int counts[4] = {0}; // 0: A, 1: C, 2: G, 3: T
    char c;

    for (int i = 0; (c = dna[i]) != '\0'; i++) {
        switch (c) {
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
            return strdup(""); // Return empty string on invalid input
        }
    }

    char *buffer = (char *)malloc(BUFFER_SIZE);
    if (buffer) {
        snprintf(buffer, BUFFER_SIZE, "A:%d C:%d G:%d T:%d",
                 counts[0], counts[1], counts[2], counts[3]);
    }
    return buffer;
}