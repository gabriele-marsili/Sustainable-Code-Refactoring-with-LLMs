#include "raindrops.h"

#include <stdio.h>

char *convert(char result[], int drops)
{
    int len = 0;

    if (drops % 3 == 0) {
        len += sprintf(result + len, "Pling");
    }

    if (drops % 5 == 0) {
        len += sprintf(result + len, "Plang");
    }

    if (drops % 7 == 0) {
        len += sprintf(result + len, "Plong");
    }

    if (len == 0) {
        sprintf(result, "%d", drops);
    } else {
        result[len] = '\0';
    }

    return result;
}
