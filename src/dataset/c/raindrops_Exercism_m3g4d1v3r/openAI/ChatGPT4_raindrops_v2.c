#include "raindrops.h"

#include <stdio.h>

void convert(char result[], int drops) {
    int n = 0;
    if (drops % 3 == 0) n += sprintf(result + n, "Pling");
    if (drops % 5 == 0) n += sprintf(result + n, "Plang");
    if (drops % 7 == 0) n += sprintf(result + n, "Plong");
    if (n == 0) sprintf(result, "%d", drops);
}
