#include "grains.h"

unsigned long square(int n) {
    if( n < 1 || 64 < n ) return 0;
    return 1ul << (n - 1);
}

unsigned long total() {
    return 18446744073709551615ul;
}