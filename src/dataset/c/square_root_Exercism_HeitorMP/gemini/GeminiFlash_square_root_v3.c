#include "square_root.h"

UINT16 square_root(UINT16 number) {
    if (number <= 1) {
        return number;
    }

    UINT16 low = 1;
    UINT16 high = number / 2;
    UINT16 result = 0;

    while (low <= high) {
        UINT16 mid = low + (high - low) / 2;
        UINT16 square = mid * mid;

        if (square == number) {
            return mid;
        } else if (square < number) {
            low = mid + 1;
            result = mid;
        } else {
            high = mid - 1;
        }
    }

    return 0;
}