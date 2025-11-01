#include "raindrops.h"
#include <stdbool.h>

void convert(char result[], int drops)
{
    bool isPling = (drops % 3 == 0);
    bool isPlang = (drops % 5 == 0);
    bool isPlong = (drops % 7 == 0);

    if (isPling || isPlang || isPlong) {
        result[0] = '\0'; // Initialize result as an empty string
        if (isPling) strcat(result, "Pling");
        if (isPlang) strcat(result, "Plang");
        if (isPlong) strcat(result, "Plong");
    } else {
        sprintf(result, "%d", drops);
    }
}