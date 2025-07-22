#include "raindrops.h"
#include <string.h>
#include <stdio.h>

void convert(char result[], int drops)
{
    result[0] = '\0'; // Ensure result is an empty string initially

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

    if (result[0] == '\0') // If no factors were found, convert the number
    {
        sprintf(result, "%d", drops);
    }
}