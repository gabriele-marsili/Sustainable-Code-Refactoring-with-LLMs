#include "hamming.h"
#include <string.h>
#include <stddef.h>

int compute(const char* dna_a, const char* dna_b) {
    if (!dna_a || !dna_b) {
        return -1;
    }

    size_t len_a = strlen(dna_a);
    size_t len_b = strlen(dna_b);

    if (len_a != len_b) {
        return -1;
    }

    int diffs = 0;
    for (size_t i = 0; i < len_a; ++i) {
        if (dna_a[i] != dna_b[i]) {
            diffs++;
        }
    }
    return diffs;
}