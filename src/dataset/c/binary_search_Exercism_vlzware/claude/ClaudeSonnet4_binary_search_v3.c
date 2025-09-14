#include "binary_search.h"
#include <stddef.h>

int* binary_search(const int x, const int arr[], const int len)
{
    if (arr == NULL || len <= 0)
        return NULL;

    int down = 0;
    int up = len - 1;
    
    while (down <= up) {
        int mid = down + ((up - down) >> 1);
        int mid_val = arr[mid];
        
        if (x == mid_val)
            return (int *) &arr[mid];
        
        if (x > mid_val)
            down = mid + 1;
        else
            up = mid - 1;
    }

    return NULL;
}