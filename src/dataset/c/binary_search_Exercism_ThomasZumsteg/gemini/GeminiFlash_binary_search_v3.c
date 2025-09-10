#include "binary_search.h"
#include <stddef.h>

int *binary_search(int needle, int *haystack, size_t len) {
    int *low = haystack;
    int *high = haystack + len;

    while (low < high) {
        int *mid = low + (high - low) / 2;
        int val = *mid;

        if (val < needle) {
            low = mid + 1;
        } else if (val > needle) {
            high = mid;
        } else {
            return mid;
        }
    }

    return 0;
}