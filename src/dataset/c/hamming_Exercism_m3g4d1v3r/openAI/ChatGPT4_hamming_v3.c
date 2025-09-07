#include "hamming.h"

#include <stdlib.h>
#include <string.h>

static inline int min(int a, int b) { return (a < b) ? a : b; }

int compute(const char *lhs, const char *rhs) {
    size_t lhs_size = strlen(lhs);
    size_t rhs_size = strlen(rhs);
    if (lhs_size != rhs_size) return -1;

    int distance = 0;
    for (size_t i = 0; i < lhs_size; ++i) {
        distance += (lhs[i] != rhs[i]);
    }
    return distance;
}