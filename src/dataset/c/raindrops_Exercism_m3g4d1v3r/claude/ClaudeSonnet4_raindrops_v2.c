#include "raindrops.h"

#include <stdio.h>

void convert(char result[], int drops) {
    char *p = result;
    
    if (drops % 3 == 0) {
        *p++ = 'P'; *p++ = 'l'; *p++ = 'i'; *p++ = 'n'; *p++ = 'g';
    }
    if (drops % 5 == 0) {
        *p++ = 'P'; *p++ = 'l'; *p++ = 'a'; *p++ = 'n'; *p++ = 'g';
    }
    if (drops % 7 == 0) {
        *p++ = 'P'; *p++ = 'l'; *p++ = 'o'; *p++ = 'n'; *p++ = 'g';
    }
    
    if (p == result) {
        sprintf(result, "%d", drops);
    } else {
        *p = '\0';
    }
}