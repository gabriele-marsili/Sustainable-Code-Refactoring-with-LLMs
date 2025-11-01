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
    
    // Find actual end (skip trailing spaces)
    while (end >= start && *end == ' ') end--;
    
    if (end < start) return false;
    
    int result = 0;
    bool is_second = false;
    int digit_count = 0;
    
    for (const char *p = end; p >= start; p--) {
        if (*p == ' ') continue;
        if (*p < '0' || *p > '9') return false;
        
        int digit = *p - '0';
        digit_count++;
        
        if (is_second) {
            digit <<= 1; // multiply by 2
            if (digit > 9) digit -= 9;
        }
        
        result += digit;
        is_second = !is_second;
    }
    
    return digit_count >= 2 && (result % 10 == 0);
}