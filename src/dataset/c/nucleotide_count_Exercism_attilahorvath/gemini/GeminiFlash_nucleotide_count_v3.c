#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE 32

char *count(const char *dna) {
    char* buffer = (char*)malloc(BUFFER_SIZE);
    if (buffer == NULL) {
        return NULL; // Handle memory allocation failure
    }

    int counts[4] = {0}; // A, C, G, T
    char c;

    for (int i = 0; (c = dna[i]) != '\0'; i++) {
        int index;
        switch (c) {
        case 'A':
            index = 0;
            break;
        case 'C':
            index = 1;
            break;
        case 'G':
            index = 2;
            break;
        case 'T':
            index = 3;
            break;
        default:
            buffer[0] = '\0';
            return buffer;
        }
        counts[index]++;
    }

    int len = snprintf(buffer, BUFFER_SIZE, "A:%d C:%d G:%d T:%d",
                     counts[0], counts[1], counts[2], counts[3]);

    if (len >= BUFFER_SIZE) {
        buffer[BUFFER_SIZE - 1] = '\0'; // Ensure null termination if truncated
    }

    return buffer;
}