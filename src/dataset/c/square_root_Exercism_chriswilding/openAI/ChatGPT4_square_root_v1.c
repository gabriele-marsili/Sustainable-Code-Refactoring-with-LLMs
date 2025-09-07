#include "square_root.h"

int square_root(int n) {
    if (n < 2) {
        return n;
    }

    int left = 1, right = n, result = 1;
    while (left <= right) {
        int mid = left + ((right - left) >> 1);
        if (mid <= n / mid) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}