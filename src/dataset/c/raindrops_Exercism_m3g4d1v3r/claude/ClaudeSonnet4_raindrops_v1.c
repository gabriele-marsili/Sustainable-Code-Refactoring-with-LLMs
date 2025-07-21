#include "raindrops.h"

#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void convert(char result[], int drops) {
    char *ptr = result;
    
    if (drops % 3 == 0) {
        memcpy(ptr, "Pling", 5);
        ptr += 5;
    }
    if (drops % 5 == 0) {
        memcpy(ptr, "Plang", 5);
        ptr += 5;
    }
    if (drops % 7 == 0) {
        memcpy(ptr, "Plong", 5);
        ptr += 5;
    }
    
    if (ptr == result) {
        sprintf(result, "%d", drops);
    } else {
        *ptr = '\0';
    }
}