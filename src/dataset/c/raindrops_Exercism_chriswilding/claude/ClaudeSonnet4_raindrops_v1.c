#include "raindrops.h"

#include <stdio.h>

char *convert(char result[], int drops)
{
    char *pos = result;
    
    if (drops % 3 == 0) {
        pos[0] = 'P'; pos[1] = 'l'; pos[2] = 'i'; pos[3] = 'n'; pos[4] = 'g';
        pos += 5;
    }

    if (drops % 5 == 0) {
        pos[0] = 'P'; pos[1] = 'l'; pos[2] = 'a'; pos[3] = 'n'; pos[4] = 'g';
        pos += 5;
    }

    if (drops % 7 == 0) {
        pos[0] = 'P'; pos[1] = 'l'; pos[2] = 'o'; pos[3] = 'n'; pos[4] = 'g';
        pos += 5;
    }

    if (pos == result) {
        sprintf(result, "%d", drops);
    } else {
        *pos = '\0';
    }

    return result;
}