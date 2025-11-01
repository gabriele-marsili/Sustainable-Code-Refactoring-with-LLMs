#include "raindrops.h"
#include <stdbool.h>
#include <string.h>

void convert(char result[], int drops)
{
    bool isDivisible = false;
    result[0] = '\0';

    if (drops % 3 == 0) {
        strcat(result, "Pling");
        isDivisible = true;
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
        isDivisible = true;
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
        isDivisible = true;
    }
    if (!isDivisible) {
        sprintf(result, "%d", drops);
    }
}