#include "nucleotide_count.h"
#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 32

char *count(const char *dna) {
    char* buffer = (char*)malloc(BUFFER_SIZE);
    int a_count = 0, c_count = 0, g_count = 0, t_count = 0;
    char c;

    for (int i = 0; (c = dna[i]) != '\0'; i++) {
        switch (c) {
        case 'A':
            a_count++;
            break;
        case 'C':
            c_count++;
            break;
        case 'G':
            g_count++;
            break;
        case 'T':
            t_count++;
            break;
        default:
            buffer[0] = '\0';
            return buffer;
        }
    }

    snprintf(buffer, BUFFER_SIZE, "A:%d C:%d G:%d T:%d",
             a_count, c_count, g_count, t_count);
    return buffer;
}
