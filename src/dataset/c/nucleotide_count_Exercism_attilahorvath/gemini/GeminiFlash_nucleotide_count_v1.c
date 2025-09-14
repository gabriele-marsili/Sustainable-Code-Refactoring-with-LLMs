#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *count(const char *dna) {
    char* buffer = (char*)malloc(32);
    if (!buffer) return NULL;

    int counts[4] = {0};
    const char* p = dna;

    while (*p) {
        switch (*p) {
            case 'A': counts[0]++; break;
            case 'C': counts[1]++; break;
            case 'G': counts[2]++; break;
            case 'T': counts[3]++; break;
            default:
                buffer[0] = '\0';
                return buffer;
        }
        p++;
    }

    int ret = snprintf(buffer, 32, "A:%d C:%d G:%d T:%d", counts[0], counts[1], counts[2], counts[3]);
    if (ret < 0 || ret >= 32) {
        buffer[0] = '\0';
    }
    return buffer;
}