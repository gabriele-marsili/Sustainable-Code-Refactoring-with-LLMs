#include "raindrops.h"

#include <stdio.h>

void convert(char result[], int drops) {
    int pos = 0;
    if (drops % 3 == 0) pos += sprintf(result + pos, "Pling");
    if (drops % 5 == 0) pos += sprintf(result + pos, "Plang");
    if (drops % 7 == 0) pos += sprintf(result + pos, "Plong");
    if (pos == 0) sprintf(result, "%d", drops);
}
