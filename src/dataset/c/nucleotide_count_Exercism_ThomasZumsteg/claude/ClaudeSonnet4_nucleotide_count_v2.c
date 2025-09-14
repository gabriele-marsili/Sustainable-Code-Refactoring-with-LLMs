#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>

char *count(const char *dna) {
    unsigned int counts[4] = {0}; // A, C, G, T
    char *result = malloc(25);
    
    for(const char *c = dna; *c; c++) {
        switch(*c) {
            case 'A': counts[0]++; break;
            case 'C': counts[1]++; break;
            case 'G': counts[2]++; break;
            case 'T': counts[3]++; break;
            default: 
                result[0] = '\0';
                return result;
        }
    }
    
    sprintf(result, "A:%u C:%u G:%u T:%u", counts[0], counts[1], counts[2], counts[3]);
    return result;
}