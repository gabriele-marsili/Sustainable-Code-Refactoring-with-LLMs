#include "hamming.h"
#include <string.h>

int compute(const char *a, const char *b) {
    if (a == NULL || b == NULL) {
        return -1;
    }

    size_t len_a = strlen(a);
    size_t len_b = strlen(b);

    if (len_a != len_b) {
        return -1;
    }

    int d = 0;
    for (size_t i = 0; i < len_a; i++) {
        d += (a[i] != b[i]);
    }

    return d;
}