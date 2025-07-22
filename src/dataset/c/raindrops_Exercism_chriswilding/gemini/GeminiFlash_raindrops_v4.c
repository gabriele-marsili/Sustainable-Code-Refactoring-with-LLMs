#include "raindrops.h"
#include <stdio.h>
#include <string.h>

char *convert(char result[], int drops)
{
    result[0] = '\0'; // Ensure result is an empty string
    int appended = 0;

    if (drops % 3 == 0) {
        strcat(result, "Pling");
        appended = 1;
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
        appended = 1;
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
        appended = 1;
    }

    if (!appended) {
        sprintf(result, "%d", drops);
    }

    return result;
}