#include "raindrops.h"
#include <stdio.h>
#include <string.h>
char *convert(char result[], int drops)
{
    result[0] = '\0'; // Initialize result as an empty string

    int has_factor = 0;

    if (drops % 3 == 0) {
        strcat(result, "Pling");
        has_factor = 1;
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
        has_factor = 1;
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
        has_factor = 1;
    }

    if (!has_factor) {
        sprintf(result, "%d", drops);
    }

    return result;
}