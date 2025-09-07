#include "hamming.h"
#include <stddef.h>
#include <string.h>

int compute(const char *dna_a, const char *dna_b)
{
    if (dna_a == NULL || dna_b == NULL)
        return -1;

    size_t len_a = strlen(dna_a);
    size_t len_b = strlen(dna_b);
    
    if (len_a != len_b)
        return -1;

    int diff = 0;
    const char *end = dna_a + len_a;
    
    while (dna_a < end) {
        diff += (*dna_a++ != *dna_b++);
    }

    return diff;
}