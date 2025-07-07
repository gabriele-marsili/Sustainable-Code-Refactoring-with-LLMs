#include "raindrops.h"
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void convert(char result[], int drops) {
    result[0] = '\0'; // Initialize result as an empty string

    if (drops % 3 == 0) {
        strcat(result, "Pling");
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
    }

    if (result[0] == '\0') { // Check if result is still empty
        sprintf(result, "%d", drops);
    }
}