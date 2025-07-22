#include "raindrops.h"
#include <string.h>
#include <stdio.h>
#include <stdbool.h>

char *convert(char result[], int drops)
{
    result[0] = '\0';
    bool has_sound = false;
    int current_len = 0;

    if (drops % 3 == 0) {
        memcpy(result, "Pling", 5);
        current_len += 5;
        has_sound = true;
    }

    if (drops % 5 == 0) {
        memcpy(result + current_len, "Plang", 5);
        current_len += 5;
        has_sound = true;
    }

    if (drops % 7 == 0) {
        memcpy(result + current_len, "Plong", 5);
        current_len += 5;
        has_sound = true;
    }

    if (has_sound) {
        result[current_len] = '\0';
    } else {
        sprintf(result, "%d", drops);
    }

    return result;
}