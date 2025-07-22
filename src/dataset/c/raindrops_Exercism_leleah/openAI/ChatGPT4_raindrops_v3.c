#include "raindrops.h"
#include <stdio.h>
#include <string.h>

void convert(char result[], int drops)
{
    int divisible3 = (drops % 3 == 0);
    int divisible5 = (drops % 5 == 0);
    int divisible7 = (drops % 7 == 0);

    result[0] = '\0';

    if (divisible3) strcat(result, "Pling");
    if (divisible5) strcat(result, "Plang");
    if (divisible7) strcat(result, "Plong");

    if (!divisible3 && !divisible5 && !divisible7)
        sprintf(result, "%d", drops);
}
