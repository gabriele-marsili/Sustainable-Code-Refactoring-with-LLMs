#include "raindrops.h"

#include <stdio.h>

char *convert(char result[], int drops)
{
    int pos = 0;

    if (drops % 3 == 0) {
        result[pos++] = 'P'; result[pos++] = 'l'; result[pos++] = 'i'; result[pos++] = 'n'; result[pos++] = 'g';
    }
    if (drops % 5 == 0) {
        result[pos++] = 'P'; result[pos++] = 'l'; result[pos++] = 'a'; result[pos++] = 'n'; result[pos++] = 'g';
    }
    if (drops % 7 == 0) {
        result[pos++] = 'P'; result[pos++] = 'l'; result[pos++] = 'o'; result[pos++] = 'n'; result[pos++] = 'g';
    }

    if (pos == 0) {
        pos += sprintf(result, "%d", drops);
    } else {
        result[pos] = '\0';
    }

    return result;
}
