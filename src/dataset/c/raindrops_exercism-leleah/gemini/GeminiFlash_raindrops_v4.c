#include "raindrops.h"
#include <string.h>
void convert(char result[], int drops) {
    result[0] = '\0';
    int len = 0;

    if (drops % 3 == 0) {
        strcpy(result, "Pling");
        len = 5;
    }

    if (drops % 5 == 0) {
        strcpy(result + len, "Plang");
        len += 5;
    }

    if (drops % 7 == 0) {
        strcpy(result + len, "Plong");
        len += 5;
    }

    if (len == 0) {
        sprintf(result, "%d", drops);
    }
}