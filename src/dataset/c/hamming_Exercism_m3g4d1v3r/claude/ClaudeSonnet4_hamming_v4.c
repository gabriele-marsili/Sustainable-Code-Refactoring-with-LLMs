#include "hamming.h"

#include <stdlib.h>
#include <string.h>

int compute(const char *lhs, const char *rhs) {
    int lhs_size = strlen(lhs);
    int rhs_size = strlen(rhs);
    
    if (lhs_size != rhs_size) return -1;
    
    int distance = 0;
    const char *end = lhs + lhs_size;
    
    while (lhs < end) {
        distance += (*lhs++ != *rhs++);
    }
    
    return distance;
}