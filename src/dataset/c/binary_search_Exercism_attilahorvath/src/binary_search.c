#include "binary_search.h"

int *binary_search(int n, int arr[], size_t length) {
    if (!arr || length == 0) {
        return NULL;
    }

    size_t index = length / 2;
    int pivot = arr[index];

    if (n < pivot) {
        return binary_search(n, arr, index);
    } else if (n > pivot) {
        return binary_search(n, arr + index + 1, index);
    }

    return arr + index;
}
