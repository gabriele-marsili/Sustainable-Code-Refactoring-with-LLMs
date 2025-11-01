#include "raindrops.h"
#include <string.h>
#include <stdio.h>

void convert(char result[], int drops) {
    result[0] = '\0';
    int len = 0;

    if (drops % 3 == 0) {
        strcat(result, "Pling");
        len += 5;
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
        len += 5;
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
        len += 5;
    }

    if (len == 0) {
        sprintf(result, "%d", drops);
    }
}