#include "grains.h"

unsigned long square(int n) {
    return (n < 1 || n > 64) ? 0 : 1UL << (n - 1);
}

unsigned long total() {
    return ~0UL;
}