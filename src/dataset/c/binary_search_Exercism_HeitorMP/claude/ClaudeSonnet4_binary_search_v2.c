#include "binary_search.h"

int *binary_search(int value, const int *arr, size_t length)
{
    if (!arr || length == 0)
        return NULL;
    
    size_t start = 0;
    size_t end = length;
    
    while (start < end)
    {
        size_t mid = start + ((end - start) >> 1);
        int mid_val = arr[mid];
        
        if (mid_val == value)
            return (int *)&arr[mid];
        else if (mid_val < value)
            start = mid + 1;
        else
            end = mid;
    }
    return NULL;
}