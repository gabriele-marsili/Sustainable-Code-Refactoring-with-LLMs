#include "raindrops.h"
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void convert(char result[], int drops) {
    bool is_pling = (drops % 3 == 0);
    bool is_plang = (drops % 5 == 0);
    bool is_plong = (drops % 7 == 0);

    result[0] = '\0'; // Initialize result as an empty string

    if (is_pling) {
        strcat(result, "Pling");
    }
    if (is_plang) {
        strcat(result, "Plang");
    }
    if (is_plong) {
        strcat(result, "Plong");
    }

    if (!is_pling && !is_plang && !is_plong) {
        sprintf(result, "%d", drops);
    }
}