#include "hamming.h"

#include <stdlib.h>
#include <string.h>

int compute(const char *lhs, const char *rhs) {
    if (!lhs || !rhs) return -1;
    
    int distance = 0;
    int i = 0;
    
    // Compare characters while both strings have characters
    while (lhs[i] && rhs[i]) {
        if (lhs[i] != rhs[i]) distance++;
        i++;
    }
    
    // If one string is longer than the other, return -1
    if (lhs[i] || rhs[i]) return -1;
    
    return distance;
}