#include "binary_search.h"
#include <stdio.h>

const int *binary_search(int value, const int *arr, size_t length)
{   
    if (length == 0) return NULL;
    if(length < 2) return &arr[0];
    size_t middle = (size_t)length * 0.5;
    if(!is_sorted(arr,length))
    {
        fprintf(stderr,"ERROR : Array is not sorted") ;
        return NULL;
    }
    if (value == arr[middle]) return &arr[middle];
    if(value < arr[middle])
    {
        for(size_t i = 0; i < middle;++i)
        {
            if(value == arr[i]) return &arr[i];
        }
        return NULL;
    }
    else
    {
        for(size_t i = middle; i < length;++i)
        {
            if(value == arr[i]) return &arr[i];
        }
        return NULL;
    }
    return NULL;
}

bool is_sorted(const int *arr, size_t length)
{
    for(size_t i = 1; i < length;++i)
    {
        if(arr[i-1] > arr[i]) return false;
    }
    return true;
}
