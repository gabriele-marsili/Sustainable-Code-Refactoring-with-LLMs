#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUFFER_SIZE 32

char *count(const char *dna) {
    char* buffer = (char*)malloc(BUFFER_SIZE);
    int counts[4] = {0}; // A, C, G, T
    
    const char *ptr = dna;
    char c;
    
    while ((c = *ptr++)) {
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
            buffer[0] = '\0';
            return buffer;
        }
    }

    snprintf(buffer, BUFFER_SIZE, "A:%d C:%d G:%d T:%d",
             counts[0], counts[1], counts[2], counts[3]);
    return buffer;
}