#include "hamming.h"
#include <string.h>

int compute(char* dna_a, char* dna_b) {
    int len_a = strlen(dna_a);
    int len_b = strlen(dna_b);
    int chars = len_a < len_b ? len_a : len_b;
    int diffs = 0;
    
    for(int i = 0; i < chars; i++) {
        diffs += (dna_a[i] != dna_b[i]);
    }
    
    return diffs;
}