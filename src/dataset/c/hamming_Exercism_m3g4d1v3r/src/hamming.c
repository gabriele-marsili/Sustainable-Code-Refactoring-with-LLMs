#include "hamming.h"

#include <stdlib.h>
#include <string.h>

static inline int min(int a, int b) { return ((a < b) ? a : b); }

int compute(const char *lhs, const char *rhs) {
    int lhs_size = strlen(lhs);
    int rhs_size = strlen(rhs);
    int distance = 0;
    if (abs(lhs_size - rhs_size) != 0) return (-1);

    for (int i = 0; i < lhs_size; i++) {
        if (lhs[i] != rhs[i]) distance++;
    }
    return (distance);
}
