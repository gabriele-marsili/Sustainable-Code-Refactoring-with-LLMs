#include "raindrops.h"
#include <stdio.h>

void convert(char result[], int drops)
{
    char *ptr = result;
    
    if (drops <= 2) {
        *ptr++ = (char)(drops + '0');
        *ptr = '\0';
        return;
    }
    
    int has_factor = 0;
    
    if (drops % 3 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'i'; *ptr++ = 'n'; *ptr++ = 'g';
        has_factor = 1;
    }
    if (drops % 5 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'a'; *ptr++ = 'n'; *ptr++ = 'g';
        has_factor = 1;
    }
    if (drops % 7 == 0) {
        *ptr++ = 'P'; *ptr++ = 'l'; *ptr++ = 'o'; *ptr++ = 'n'; *ptr++ = 'g';
        has_factor = 1;
    }
    
    if (!has_factor) {
        ptr += sprintf(ptr, "%d", drops);
    }
    
    *ptr = '\0';
}