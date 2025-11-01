#include "binary_search.h"
#include <stdio.h>
#include <stdbool.h>

const int *binary_search(int value, const int *arr, size_t length) {
    if (length == 0) return NULL;

    if (!is_sorted(arr, length)) {
        fprintf(stderr, "ERROR : Array is not sorted\n");
        return NULL;
    }

    size_t low = 0;
    size_t high = length;

    while (low < high) {
        size_t mid = low + (high - low) / 2;

        if (arr[mid] == value) {
            return &arr[mid];
        } else if (arr[mid] < value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return NULL;
}

bool is_sorted(const int *arr, size_t length) {
    if (length <= 1) return true;
    for (size_t i = 1; i < length; ++i) {
        if (arr[i - 1] > arr[i]) return false;
    }
    return true;
}