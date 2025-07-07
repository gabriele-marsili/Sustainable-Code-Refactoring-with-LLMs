#include "raindrops.h"
#include <stdio.h>
#include <string.h>
char *convert(char result[], int drops)
{
    result[0] = '\0';
    int has_pling = (drops % 3 == 0);
    int has_plang = (drops % 5 == 0);
    int has_plong = (drops % 7 == 0);
    if (has_pling) {
        strcat(result, "Pling");
    }
    if (has_plang) {
        strcat(result, "Plang");
    }
    if (has_plong) {
        strcat(result, "Plong");
    }
    if (!has_pling && !has_plang && !has_plong) {
        sprintf(result, "%d", drops);
    }
    return result;
}