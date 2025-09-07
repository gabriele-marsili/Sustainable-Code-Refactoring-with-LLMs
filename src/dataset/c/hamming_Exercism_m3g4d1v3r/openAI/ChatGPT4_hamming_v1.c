#include "hamming.h"

#include <string.h>

static inline int min(int a, int b) { return (a < b) ? a : b; }

int compute(const char *lhs, const char *rhs) {
    int distance = 0;

    for (int i = 0; lhs[i] != '\0' && rhs[i] != '\0'; i++) {
        if (lhs[i] != rhs[i]) distance++;
    }

    if (lhs[strlen(lhs)] != rhs[strlen(rhs)]) return -1;

    return distance;
}