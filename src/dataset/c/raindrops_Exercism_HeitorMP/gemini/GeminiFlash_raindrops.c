#include "raindrops.h"
#include <stdio.h> // Required for sprintf
#include <string.h>

char *convert(char result[], int drops)
{
    // Ensure result is initially empty
    result[0] = '\0';

    if (drops % 3 == 0)
    {
        strcat(result, "Pling");
    }
    if (drops % 5 == 0)
    {
        strcat(result, "Plang");
    }
    if (drops % 7 == 0)
    {
        strcat(result, "Plong");
    }

    // If result is still empty, it means no factors of 3, 5, or 7 were found.
    if (result[0] == '\0')
    {
        // Use sprintf to convert the integer to a string directly.
        // This is generally more efficient and less error-prone than manual digit extraction.
        sprintf(result, "%d", drops);
    }

    return result;
}