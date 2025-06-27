#include "raindrops.h"

#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void convert(char result[], int drops) {
    bool flag = false;
    strcpy(result, "");
    if (drops % 3 == 0) {
        strcat(result, "Pling");
        flag = true;
    }
    if (drops % 5 == 0) {
        strcat(result, "Plang");
        flag = true;
    }
    if (drops % 7 == 0) {
        strcat(result, "Plong");
        flag = true;
    }
    if (flag == false) sprintf(result, "%d", drops);
}
