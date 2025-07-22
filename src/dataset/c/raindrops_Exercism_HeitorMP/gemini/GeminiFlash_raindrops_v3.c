#include "raindrops.h"
#include <stdio.h>
#include <stdbool.h>

char *convert(char result[], int drops)
{
    result[0] = '\0';
    
    bool has_sound = false;
    int offset = 0;

    if (drops % 3 == 0) {
        offset += sprintf(result + offset, "Pling");
        has_sound = true;
    }
    
    if (drops % 5 == 0) {
        offset += sprintf(result + offset, "Plang");
        has_sound = true;
    }
    
    if (drops % 7 == 0) {
        offset += sprintf(result + offset, "Plong");
        has_sound = true;
    }
    
    if (!has_sound) {
        sprintf(result, "%d", drops);
    }
    
    return result;
}