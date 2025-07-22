#include "raindrops.h"
#include <stdio.h>
#include <string.h>

char *convert(char result[], int drops)
{
    int original_length = 0; // Keep track of the initial length to avoid strlen() later

    result[0] = '\0'; // Ensure result is an empty string initially

    if (drops % 3 == 0) {
        strcpy(result, "Pling");
        original_length += 5;
    }
    if (drops % 5 == 0) {
        strcpy(result + original_length, "Plang");
        original_length += 5;
    }
    if (drops % 7 == 0) {
        strcpy(result + original_length, "Plong");
        original_length += 5;
    }

    if (original_length == 0) { // Check original_length instead of strlen(result)
        sprintf(result, "%d", drops);
    }
    return result;
}