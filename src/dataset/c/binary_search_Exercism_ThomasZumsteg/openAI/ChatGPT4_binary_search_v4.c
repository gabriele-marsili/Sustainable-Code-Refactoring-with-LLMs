#include "binary_search.h"
#include <stdio.h>

int *binary_search(int needle, int *haystack, size_t len) {
    int *start = haystack;
    int *end = haystack + len - 1;

    while (start <= end) {
        int *mid = start + (end - start) / 2;
        if (*mid == needle)
            return mid;
        else if (*mid < needle)
            start = mid + 1;
        else
            end = mid - 1;
    }
    return NULL;
}