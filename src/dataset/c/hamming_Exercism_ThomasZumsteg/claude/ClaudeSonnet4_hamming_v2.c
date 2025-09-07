#include "hamming.h"

int compute(char* dna_a, char* dna_b) {
    int diffs = 0;
    int i = 0;
    
    while(dna_a[i] && dna_b[i]) {
        if(dna_a[i] != dna_b[i])
            diffs++;
        i++;
    }
    
    return diffs;
}