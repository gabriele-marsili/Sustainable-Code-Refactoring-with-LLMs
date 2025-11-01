#include "binary_search.h"
#include <stdio.h>

const int *binary_search(int value, const int *arr, size_t length)
{   
    if (length == 0) return NULL;
    if (length == 1) return (arr[0] == value) ? &arr[0] : NULL;
    
    if (!is_sorted(arr, length))
    {
        fprintf(stderr, "ERROR : Array is not sorted");
        return NULL;
    }
    
    size_t left = 0;
    size_t right = length - 1;
    
    while (left <= right)
    {
        size_t middle = left + (right - left) / 2;
        
        if (arr[middle] == value) return &arr[middle];
        
        if (value < arr[middle])
        {
            if (middle == 0) break;
            right = middle - 1;
        }
        else
        {
            left = middle + 1;
        }
    }
    
    return NULL;
}

bool is_sorted(const int *arr, size_t length)
{
    for (size_t i = 1; i < length; ++i)
    {
        if (arr[i-1] > arr[i]) return false;
    }
    return true;
}