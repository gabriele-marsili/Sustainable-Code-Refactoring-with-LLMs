#include "raindrops.h"
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
void convert(char result[], int drops) {
    size_t len = 0;
    bool pling = (drops % 3 == 0);
    bool plang = (drops % 5 == 0);
    bool plong = (drops % 7 == 0);
    if (pling) {
        memcpy(result + len, "Pling", 5);
        len += 5;
    }
    if (plang) {
        memcpy(result + len, "Plang", 5);
        len += 5;
    }
    if (plong) {
        memcpy(result + len, "Plong", 5);
        len += 5;
    }
    if (len == 0) {
        sprintf(result, "%d", drops);
    } else {
        result[len] = '\0';
    }
}