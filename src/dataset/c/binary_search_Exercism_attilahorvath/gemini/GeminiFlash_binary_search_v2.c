#include "binary_search.h"

int *binary_search(int n, int arr[], size_t length) {
    if (!arr || length == 0) {
        return NULL;
    }

    size_t low = 0;
    size_t high = length;

    while (low < high) {
        size_t mid = low + (high - low) / 2;  // Prevent potential overflow
        int pivot = arr[mid];

        if (n < pivot) {
            high = mid;
        } else if (n > pivot) {
            low = mid + 1;
        } else {
            return arr + mid;
        }
    }

    return NULL; // Element not found
}