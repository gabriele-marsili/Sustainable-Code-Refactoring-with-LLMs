#include "hamming.h"
#include <stddef.h>

int compute(const char *dna_a, const char *dna_b)
{
    if (dna_a == NULL || dna_b == NULL) {
        return -1;
    }

    int diff = 0;
    const char *a = dna_a;
    const char *b = dna_b;

    while (*a != '\0' && *b != '\0') {
        if (*a != *b) {
            diff++;
        }
        a++;
        b++;
    }

    if (*a != '\0' || *b != '\0') {
        return -1;
    }

    return diff;
}