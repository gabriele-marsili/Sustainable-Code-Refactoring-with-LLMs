#include "hamming.h"

int compute(const char *a, const char *b) {
    int d = 0;
    const char *pa = a, *pb = b;
    
    while (*pa && *pb) {
        d += (*pa++ != *pb++);
    }
    
    return d;
}