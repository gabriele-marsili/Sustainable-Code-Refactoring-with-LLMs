#include "hamming.h"

#include <stdlib.h>
#include <string.h>

int compute(const char *lhs, const char *rhs) {
    int lhs_size = strlen(lhs);
    int rhs_size = strlen(rhs);
    
    if (lhs_size != rhs_size) return -1;
    
    int distance = 0;
    for (int i = 0; i < lhs_size; i++) {
        distance += (lhs[i] != rhs[i]);
    }
    return distance;
}