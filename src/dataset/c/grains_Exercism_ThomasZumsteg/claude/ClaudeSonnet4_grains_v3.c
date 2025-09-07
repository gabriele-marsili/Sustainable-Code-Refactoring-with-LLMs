#include "grains.h"

unsigned long square(int n) {
    if (n < 1 || n > 64) return 0;
    return 1UL << (n - 1);
}

unsigned long total() {
    return 18446744073709551615UL;
}