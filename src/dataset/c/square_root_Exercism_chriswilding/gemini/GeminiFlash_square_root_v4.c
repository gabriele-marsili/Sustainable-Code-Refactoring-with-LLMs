#include "square_root.h"

int square_root(int n) {
    if (n < 2) {
        return n;
    }

    int low = 0;
    int high = n;
    int root = 0;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        long square = (long)mid * mid; 

        if (square == n) {
            return mid;
        } else if (square < n) {
            root = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return root;
}