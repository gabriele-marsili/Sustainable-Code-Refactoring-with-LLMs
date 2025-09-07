#include "hamming.h"

#include <string.h>

int compute(const char *lhs, const char *rhs) {
    if (!lhs || !rhs) return -1;

    size_t lhs_size = strlen(lhs);
    size_t rhs_size = strlen(rhs);
    if (lhs_size != rhs_size) return -1;

    int distance = 0;
    for (size_t i = 0; lhs[i] && rhs[i]; i++) {
        distance += (lhs[i] != rhs[i]);
    }
    return distance;
}