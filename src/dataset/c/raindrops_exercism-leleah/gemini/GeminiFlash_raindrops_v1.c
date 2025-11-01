#include "raindrops.h"
#include <string.h>
void convert(char result[], int drops) {
    result[0] = '\0'; // Initialize the string to empty

    if (drops % 3 == 0) {
        strcat(result, "Pling");
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
    }

    if (result[0] == '\0') {
        sprintf(result, "%d", drops);
    }
}