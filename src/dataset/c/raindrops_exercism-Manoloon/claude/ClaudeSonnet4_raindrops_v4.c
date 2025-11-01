#include "raindrops.h"
#include <stdio.h>

void convert(char result[], int drops)
{
    char *ptr = result;
    
    if (drops % 3 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (drops % 5 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    if (drops % 7 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
    }
    
    if (ptr == result) {
        if (drops <= 2) {
            *ptr++ = (char)(drops + '0');
        } else {
            ptr += snprintf(ptr, 20, "%d", drops);
        }
    }
    
    *ptr = '\0';
}