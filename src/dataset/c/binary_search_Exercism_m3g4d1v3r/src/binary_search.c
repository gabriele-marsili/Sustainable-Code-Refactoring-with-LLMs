#include "binary_search.h"

int compare(const void *a, const void *b);

const int *return_function(const int *result, int *arr);

int compare(const void *a, const void *b) { return (*(int *)a - *(int *)b); }

const int *return_function(const int *result, int *arr) {
    free(arr);
    return (result);
}

const int *binary_search(int value, const int *arr, size_t length) {
    int *aux_arr;
    size_t idx_i, idx_j;

    if (length == 0) {
        return (NULL);
    }
    if (length == 1) {
        if (arr[0] == value)
            return (&arr[0]);
        else
            return (NULL);
    }
    aux_arr = malloc(sizeof(int *) * length);
    memcpy(aux_arr, arr, sizeof(int) * length);
    qsort(aux_arr, length, sizeof(int), compare);
    idx_i = 0;
    idx_j = length;
    while (idx_i < (idx_j - 1)) {
        size_t idx_new = (idx_i + floor((idx_j - idx_i) / 2.0));
        int middle_value = arr[idx_new];
        if (middle_value == value) {
            return (return_function(&arr[idx_new], aux_arr));
        } else if (middle_value > value) {
            idx_j = idx_new;
        } else {
            idx_i = idx_new;
        }
    }
    if (arr[idx_i] == value) {
        return (return_function(&arr[idx_i], aux_arr));
    }
    return (return_function(NULL, aux_arr));
}
