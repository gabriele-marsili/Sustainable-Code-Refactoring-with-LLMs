#include "raindrops.h"
#include <stdio.h>

char *convert(char result[], int drops)
{
    int pos = 0;
    bool has_sound = false;

    if (drops % 3 == 0) {
        const char *s = "Pling";
        while (*s) result[pos++] = *s++;
        has_sound = true;
    }

    if (drops % 5 == 0) {
        const char *s = "Plang";
        while (*s) result[pos++] = *s++;
        has_sound = true;
    }

    if (drops % 7 == 0) {
        const char *s = "Plong";
        while (*s) result[pos++] = *s++;
        has_sound = true;
    }

    if (!has_sound) {
        pos += sprintf(result + pos, "%d", drops);
    }

    result[pos] = '\0';
    return result;
}
