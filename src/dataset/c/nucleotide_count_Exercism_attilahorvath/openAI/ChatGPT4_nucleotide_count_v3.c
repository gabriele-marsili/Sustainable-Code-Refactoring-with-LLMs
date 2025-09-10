#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE 32

char *count(const char *dna) {
    int counts[4] = {0}; // A, C, G, T
    const char *ptr = dna;

    while (*ptr) {
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
        default: {
            char *buffer = (char *)malloc(1);
            if (buffer) buffer[0] = '\0';
            return buffer;
        }
        }
        ptr++;
    }

    char *buffer = (char *)malloc(BUFFER_SIZE);
    if (buffer) {
        snprintf(buffer, BUFFER_SIZE, "A:%d C:%d G:%d T:%d",
                 counts[0], counts[1], counts[2], counts[3]);
    }
    return buffer;
}