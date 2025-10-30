#ifndef BINARY_SEARCH_H
#define BINARY_SEARCH_H

#include <stddef.h>
#include <stdbool.h>

const int *binary_search(int value, const int *arr, size_t length);

bool is_sorted(const int* arr, size_t length);
#endif
