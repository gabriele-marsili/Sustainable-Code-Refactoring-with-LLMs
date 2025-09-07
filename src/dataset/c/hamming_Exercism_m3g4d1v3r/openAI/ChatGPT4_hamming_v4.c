#include "hamming.h"

#include <stddef.h>

static inline int min(int a, int b) { return (a < b) ? a : b; }

int compute(const char *lhs, const char *rhs) {
    if (!lhs || !rhs) return -1;

    int distance = 0;
    for (size_t i = 0; lhs[i] && rhs[i]; i++) {
        if (lhs[i] != rhs[i]) distance++;
    }

    return (lhs[distance] || rhs[distance]) ? -1 : distance;
}