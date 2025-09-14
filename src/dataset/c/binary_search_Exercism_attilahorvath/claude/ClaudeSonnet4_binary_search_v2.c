#include "binary_search.h"

int *binary_search(int n, int arr[], size_t length) {
    if (!arr || length == 0) {
        return NULL;
    }

    size_t left = 0;
    size_t right = length;
    
    while (left < right) {
        size_t mid = left + (right - left) / 2;
        int pivot = arr[mid];
        
        if (n < pivot) {
            right = mid;
        } else if (n > pivot) {
            left = mid + 1;
        } else {
            return arr + mid;
        }
    }
    
    return NULL;
}