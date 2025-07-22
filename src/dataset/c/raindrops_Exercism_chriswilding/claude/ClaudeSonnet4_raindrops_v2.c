#include "raindrops.h"

#include <stdio.h>

char *convert(char result[], int drops)
{
    char *ptr = result;
    
    if (drops % 3 == 0) {
        ptr[0] = 'P'; ptr[1] = 'l'; ptr[2] = 'i'; ptr[3] = 'n'; ptr[4] = 'g';
        ptr += 5;
    }

    if (drops % 5 == 0) {
        ptr[0] = 'P'; ptr[1] = 'l'; ptr[2] = 'a'; ptr[3] = 'n'; ptr[4] = 'g';
        ptr += 5;
    }

    if (drops % 7 == 0) {
        ptr[0] = 'P'; ptr[1] = 'l'; ptr[2] = 'o'; ptr[3] = 'n'; ptr[4] = 'g';
        ptr += 5;
    }

    if (ptr == result) {
        sprintf(result, "%d", drops);
    } else {
        *ptr = '\0';
    }

    return result;
}