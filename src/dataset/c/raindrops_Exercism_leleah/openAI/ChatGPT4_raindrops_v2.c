#include "raindrops.h"
#include <stdio.h>
void convert(char result[], int drops)
{
    int written = 0;
    if (drops % 3 == 0) { written += sprintf(result + written, "Pling"); }
    if (drops % 5 == 0) { written += sprintf(result + written, "Plang"); }
    if (drops % 7 == 0) { written += sprintf(result + written, "Plong"); }
    if (written == 0) { sprintf(result, "%d", drops); }
}
