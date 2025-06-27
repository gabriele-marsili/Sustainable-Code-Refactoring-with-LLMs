#include "square_root.h"

int square_root(int n) {
    if (n < 2) {
        return n;
    }

    int small = square_root(n >> 2) << 1;
    int large = small + 1;
    if (large * large > n) {
        return small;
    }
    return large;
}
