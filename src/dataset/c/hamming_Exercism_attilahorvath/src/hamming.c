#include "hamming.h"

int compute(const char *a, const char *b) {
    int d = 0;

    for (int i = 0; a[i] != '\0' && b[i] != '\0'; i++) {
        if (a[i] != b[i]) {
            d++;
        }
    }

    return d;
}
