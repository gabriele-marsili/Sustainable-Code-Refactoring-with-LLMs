#include "square_root.h"

int square_root(int n) {
    if (n < 2) {
        return n;
    }

    int low = 1;
    int high = n / 2;
    int root = n;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        int square = n / mid;  // Avoid potential overflow

        if (square == mid) {
            return mid;
        } else if (square < mid) {
            high = mid - 1;
        } else {
            low = mid + 1;
            root = mid;
        }
    }

    return high;
}