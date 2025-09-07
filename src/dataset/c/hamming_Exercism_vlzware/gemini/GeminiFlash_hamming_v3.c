#include "hamming.h"
#include <stddef.h>

int compute(const char *dna_a, const char *dna_b)
{
    if (dna_a == NULL || dna_b == NULL) {
        return -1;
    }

    int diff = 0;
    size_t len_a = 0;
    size_t len_b = 0;

    while (dna_a[len_a] != '\0') {
        len_a++;
    }

    while (dna_b[len_b] != '\0') {
        len_b++;
    }

    if (len_a != len_b) {
        return -1;
    }

    for (size_t i = 0; i < len_a; ++i) {
        if (dna_a[i] != dna_b[i]) {
            diff++;
        }
    }

    return diff;
}