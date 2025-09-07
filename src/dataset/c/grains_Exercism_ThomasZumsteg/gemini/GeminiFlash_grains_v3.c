#include "grains.h"
#include <stdint.h>

unsigned long square(int n) {
    if (n < 1 || n > 64) return 0;
    return (1ul << (n - 1));
}

unsigned long total() {
    return UINT64_MAX;
}