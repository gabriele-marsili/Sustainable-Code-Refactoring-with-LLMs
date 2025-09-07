#include "hamming.h"

int compute(const char *a, const char *b) {
    int d = 0;

    while (*a && *b) {
        d += (*a++ != *b++);
    }

    return d;
}