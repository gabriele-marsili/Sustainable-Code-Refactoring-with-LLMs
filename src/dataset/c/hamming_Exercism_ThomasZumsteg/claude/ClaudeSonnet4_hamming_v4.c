#include "hamming.h"
#include <string.h>

int compute(char* dna_a, char* dna_b) {
    const size_t len_a = strlen(dna_a);
    const size_t len_b = strlen(dna_b);
    const size_t min_len = len_a < len_b ? len_a : len_b;
    
    int diffs = 0;
    for (size_t i = 0; i < min_len; i++) {
        diffs += (dna_a[i] != dna_b[i]);
    }
    
    return diffs;
}