#include "hamming.h"
#include <string.h>

int compute(const char* dna_a, const char* dna_b) {
    int diffs = 0;
    for (int i = 0; dna_a[i] != '\0' && dna_b[i] != '\0'; i++) {
        diffs += (dna_a[i] != dna_b[i]);
    }
    return diffs;
}