#include "binary_search.h"
#include <stdio.h>

int *binary_search(int needle, int *haystack, size_t len) {
    if (!haystack || len == 0) return 0;
    
    int *left = haystack;
    int *right = haystack + len - 1;
    
    while (left <= right) {
        int *mid = left + ((right - left) >> 1);
        int mid_val = *mid;
        
        if (mid_val == needle) return mid;
        if (mid_val < needle) 
            left = mid + 1;
        else 
            right = mid - 1;
    }
    
    return 0;
}