#include "raindrops.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
char *convert(char* sound, size_t len, int num) {
    sound[0] = '\0';
    int appended = 0;
    if (num % 3 == 0) {
        strncat(sound, "Pling", len - strlen(sound) - 1);
        appended = 1;
    }
    if (num % 5 == 0) {
        strncat(sound, "Plang", len - strlen(sound) - 1);
        appended = 1;
    }
    if (num % 7 == 0) {
        strncat(sound, "Plong", len - strlen(sound) - 1);
        appended = 1;
    }
    if (!appended) {
        snprintf(sound, len, "%d", num);
    }
    return sound;
}