#include "raindrops.h"

#include <stdio.h>

char *convert(char result[], int drops)
{
    char *p = result;
    int n = 0;

    if (drops % 3 == 0) {
        n = sprintf(p, "Pling");
        p += n;
    }

    if (drops % 5 == 0) {
        n = sprintf(p, "Plang");
        p += n;
    }

    if (drops % 7 == 0) {
        n = sprintf(p, "Plong");
        p += n;
    }

    if (p == result) {
        sprintf(result, "%d", drops);
    }

    return result;
}
