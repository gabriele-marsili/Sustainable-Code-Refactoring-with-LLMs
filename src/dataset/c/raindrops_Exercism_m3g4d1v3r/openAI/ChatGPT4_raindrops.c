#include "raindrops.h"

#include <stdio.h>

void convert(char result[], int drops) {
    char *p = result;

    if (drops % 3 == 0) {
        p += sprintf(p, "Pling");
    }
    if (drops % 5 == 0) {
        p += sprintf(p, "Plang");
    }
    if (drops % 7 == 0) {
        p += sprintf(p, "Plong");
    }

    if (p == result) {
        sprintf(result, "%d", drops);
    }
}
