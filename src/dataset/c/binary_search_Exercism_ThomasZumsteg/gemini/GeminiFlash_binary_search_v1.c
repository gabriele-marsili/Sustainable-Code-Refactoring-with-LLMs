#include "binary_search.h"
#include <stddef.h>

int *binary_search(int needle, int *haystack, size_t len) {
    size_t low = 0;
    size_t high = len;

    while (low < high) {
        size_t mid = low + (high - low) / 2;  // Prevent potential overflow
        int mid_val = haystack[mid];

        if (mid_val < needle) {
            low = mid + 1;
        } else if (mid_val > needle) {
            high = mid;
        } else {
            return &haystack[mid];
        }
    }

    return NULL;
}