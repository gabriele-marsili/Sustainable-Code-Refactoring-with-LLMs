#include "raindrops.h"
#include <stdio.h>

void convert(char result[], int drops)
{
    int divisible = 0;
    char *p = result;

    if (drops % 3 == 0) {
        while ((*p++ = *("Pling")) != '\0');
        p--;
        divisible = 1;
    }
    if (drops % 5 == 0) {
        while ((*p++ = *("Plang")) != '\0');
        p--;
        divisible = 1;
    }
    if (drops % 7 == 0) {
        while ((*p++ = *("Plong")) != '\0');
        p--;
        divisible = 1;
    }

    if (!divisible) {
        sprintf(result, "%d", drops);
    }
}
