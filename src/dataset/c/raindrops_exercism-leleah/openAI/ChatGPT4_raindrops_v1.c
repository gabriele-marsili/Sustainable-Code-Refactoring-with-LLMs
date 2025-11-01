#include "raindrops.h"
#include <stdbool.h>
#include <string.h>

void convert(char result[], int drops)
{
    bool hasFactor = false;
    result[0] = '\0';

    if (drops % 3 == 0) {
        strcat(result, "Pling");
        hasFactor = true;
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
        hasFactor = true;
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
        hasFactor = true;
    }
    if (!hasFactor) {
        sprintf(result, "%d", drops);
    }
}