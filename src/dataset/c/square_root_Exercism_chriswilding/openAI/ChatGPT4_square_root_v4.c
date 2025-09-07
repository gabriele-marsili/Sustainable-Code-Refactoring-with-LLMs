#include "square_root.h"

int square_root(int n) {
    if (n < 2) {
        return n;
    }

    int small = square_root(n >> 2) << 1;
    return (small * small <= n && (small + 1) * (small + 1) > n) ? small : small + 1;
}