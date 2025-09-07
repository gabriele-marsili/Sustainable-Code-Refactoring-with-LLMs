#include "square_root.h"

int square_root(int n) {
    if (n < 0) {
        return -1; // Handle negative input (optional, based on requirements)
    }
    if (n <= 1) {
        return n;
    }

    int low = 1;
    int high = n;
    int result = 0;

    while (low <= high) {
        int mid = low + (high - low) / 2; // Prevent potential overflow
        int square = n / mid; // Avoid potential overflow by dividing instead of multiplying

        if (square == mid) {
            return mid;
        } else if (square < mid) {
            high = mid - 1;
        } else {
            low = mid + 1;
            result = mid;
        }
    }
    return result;
}