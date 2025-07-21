#include "raindrops.h"
#include <string.h>
#include <stdio.h>
#include <stdbool.h>

char *convert(char result[], int drops)
{
    result[0] = '\0';
    
    bool has_sound = false;
    
    if (drops % 3 == 0) {
        strcpy(result, "Pling");
        has_sound = true;
    }
    
    if (drops % 5 == 0) {
        if (has_sound) {
            strcat(result, "Plang");
        } else {
            strcpy(result, "Plang");
        }
        has_sound = true;
    }
    
    if (drops % 7 == 0) {
        if (has_sound) {
            strcat(result, "Plong");
        } else {
            strcpy(result, "Plong");
        }
        has_sound = true;
    }

    if (!has_sound) {
        sprintf(result, "%d", drops);
    }
    
    return result;
}