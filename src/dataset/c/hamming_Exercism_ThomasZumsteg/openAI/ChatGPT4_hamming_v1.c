#include "hamming.h"

int compute(char* dna_a, char* dna_b) {
    int diffs = 0;
    for (int i = 0; dna_a[i] != '\0' && dna_b[i] != '\0'; i++) {
        if (dna_a[i] != dna_b[i])
            diffs++;
    }
    return diffs;
}