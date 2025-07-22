#include "raindrops.h"
#include <stdio.h>

void convert(char result[], int drops)
{
    int div3 = drops % 3 == 0;
    int div5 = drops % 5 == 0;
    int div7 = drops % 7 == 0;

    if (div3 || div5 || div7) {
        char *p = result;
        if (div3) p += sprintf(p, "Pling");
        if (div5) p += sprintf(p, "Plang");
        if (div7) p += sprintf(p, "Plong");
    } else {
        sprintf(result, "%d", drops);
    }
}
