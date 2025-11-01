#include "luhn.h"
#include <stdlib.h>
#include <stdio.h>
#include <ctype.h>
#include <string.h>

bool luhn(const char *num)
{
    if (num == NULL) return false;
    
    const char *end = num;
    while (*end) end++; // Find end without strlen
    
    if (end - num < 2) return false;
    if (end - num == 2 && num[1] == '0') return false;
    
    int result = 0;
    bool double_next = false;
    
    for (const char *p = end - 1; p >= num; --p)
    {
        if (*p == ' ') continue;
        if (*p < '0' || *p > '9') return false;
        
        int digit = *p - '0';
        if (double_next)
        {
            digit <<= 1; // multiply by 2
            if (digit > 9) digit -= 9;
        }
        result += digit;
        double_next = !double_next;
    }
    
    return (result % 10 == 0);
}