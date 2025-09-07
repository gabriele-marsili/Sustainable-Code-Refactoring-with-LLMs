#include "hamming.h"
#include <stddef.h>

int compute(const char *lhs, const char *rhs) {
    if (lhs == NULL || rhs == NULL) {
        return -1;
    }

    int distance = 0;
    while (*lhs != '\0' && *rhs != '\0') {
        if (*lhs != *rhs) {
            distance++;
        }
        lhs++;
        rhs++;
    }

    if (*lhs != '\0' || *rhs != '\0') {
        return -1;
    }

    return distance;
}