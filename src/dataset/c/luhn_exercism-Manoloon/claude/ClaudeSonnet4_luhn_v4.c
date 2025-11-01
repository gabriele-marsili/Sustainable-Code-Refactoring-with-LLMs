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
    
    if (end < start + 1) return false;
    if (end == start + 1 && *end == '0') return false;
    
    int result = 0;
    bool double_next = false;
    
    for (const char *p = end; p >= start; --p) {
        if (*p == ' ') continue;
        if (*p < '0' || *p > '9') return false;
        
        int digit = *p - '0';
        if (double_next) {
            digit <<= 1;
            if (digit > 9) digit -= 9;
        }
        result += digit;
        double_next = !double_next;
    }
    
    return (result % 10 == 0);
}