#include "luhn.h"
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>

bool luhn(const char *num)
{
    if (num == NULL) return false;
    
    const char *end = num + strlen(num) - 1;
    const char *start = num;
    
    // Skip trailing spaces
    while (end >= start && *end == ' ') end--;
    
    // Skip leading spaces
    while (start <= end && *start == ' ') start++;
    
    if (end - start < 1) return false;
    
    int result = 0;
    bool alternate = false;
    
    for (const char *p = end; p >= start; p--) {
        if (*p == ' ') continue;
        if (*p < '0' || *p > '9') return false;
        
        int digit = *p - '0';
        if (alternate) {
            digit <<= 1; // multiply by 2
            if (digit > 9) digit -= 9;
        }
        result += digit;
        alternate = !alternate;
    }
    
    return (result % 10 == 0);
}