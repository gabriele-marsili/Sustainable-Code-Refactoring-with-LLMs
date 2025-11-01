#include "raindrops.h"
#include <stdio.h>

void convert(char result[], int drops)
{
    int len = 0;

    if (drops % 3 == 0) {
        result[len++] = 'P'; result[len++] = 'l'; result[len++] = 'i'; result[len++] = 'n'; result[len++] = 'g';
    }
    if (drops % 5 == 0) {
        result[len++] = 'P'; result[len++] = 'l'; result[len++] = 'a'; result[len++] = 'n'; result[len++] = 'g';
    }
    if (drops % 7 == 0) {
        result[len++] = 'P'; result[len++] = 'l'; result[len++] = 'o'; result[len++] = 'n'; result[len++] = 'g';
    }
    if (len == 0) {
        len = snprintf(result, 12, "%d", drops);
    }
    result[len] = '\0';
}