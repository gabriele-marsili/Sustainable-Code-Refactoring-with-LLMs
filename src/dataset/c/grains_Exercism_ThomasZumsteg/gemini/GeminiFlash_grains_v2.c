#include "grains.h"
#include <math.h>

unsigned long square(int n) {
    if (n < 1 || n > 64) return 0;
    return (unsigned long)pow(2, n - 1);
}

unsigned long total() {
    return -1ul;
}