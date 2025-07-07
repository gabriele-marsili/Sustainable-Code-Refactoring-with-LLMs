#include "raindrops.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

static int buff_i, buff_len;

static int strcatbuf(char* dest, const char* src) {
    int i = 0;
    while (src[i] && buff_i < buff_len) {
        dest[buff_i++] = src[i++];
    }
    return i;
}

char *convert(char* sound, size_t len, int num) {
    memset(sound, 0, len);
    buff_i = 0;
    buff_len = len;

    if (num % 3 == 0) strcatbuf(sound, "Pling");
    if (num % 5 == 0) strcatbuf(sound, "Plang");
    if (num % 7 == 0) strcatbuf(sound, "Plong");

    if (buff_i == 0) {
        snprintf(sound, len, "%d", num);
    }

    return sound;
}
