#include "hamming.h"
#include <string.h>

int compute(char* dna_a, char* dna_b) {
    int diffs = 0;
    for (int i = 0; dna_a[i] && dna_b[i]; i++) {
        diffs += (dna_a[i] != dna_b[i]);
    }
    return diffs;
}