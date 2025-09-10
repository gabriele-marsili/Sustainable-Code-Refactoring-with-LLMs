#include "binary_search.h"
#include <stddef.h>

int *binary_search(int needle, int *haystack, size_t len) {
    int *low = haystack;
    int *high = haystack + len;

    while (low < high) {
        size_t mid_index = (size_t)(low - haystack) + (size_t)(high - low) / 2;
        int *mid = haystack + mid_index;

        if (*mid < needle) {
            low = mid + 1;
        } else if (*mid > needle) {
            high = mid;
        } else {
            return mid;
        }
    }

    return 0;
}