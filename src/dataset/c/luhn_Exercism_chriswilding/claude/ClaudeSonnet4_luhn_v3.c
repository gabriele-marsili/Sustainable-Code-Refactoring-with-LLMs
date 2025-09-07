#include "luhn.h"

#include <ctype.h>

bool luhn(const char *number)
{
    int n = 0;
    int sum = 0;
    
    const char *ptr = number;
    while (*ptr) ptr++;
    ptr--;
    
    while (ptr >= number) {
        char c = *ptr;
        
        if (c == ' ') {
            ptr--;
            continue;
        }
        
        if (c < '0' || c > '9')
            return false;
        
        int value = c - '0';
        
        if (n & 1) {
            value <<= 1;
            if (value > 9)
                value -= 9;
        }
        
        sum += value;
        n++;
        ptr--;
    }
    
    return n > 1 && (sum % 10) == 0;
}