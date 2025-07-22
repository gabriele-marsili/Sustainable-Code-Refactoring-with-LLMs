#include "raindrops.h"
#include <stdio.h>

char *convert(char* sound, size_t len, int num) {
    size_t current_len = 0;
    int wrote = 0;

    if (num % 3 == 0) {
        const char *s = "Pling";
        size_t slen = 5;
        if (current_len + slen < len) {
            for (size_t i = 0; i < slen; i++)
                sound[current_len + i] = s[i];
            current_len += slen;
            wrote = 1;
        }
    }
    if (num % 5 == 0) {
        const char *s = "Plang";
        size_t slen = 5;
        if (current_len + slen < len) {
            for (size_t i = 0; i < slen; i++)
                sound[current_len + i] = s[i];
            current_len += slen;
            wrote = 1;
        }
    }
    if (num % 7 == 0) {
        const char *s = "Plong";
        size_t slen = 5;
        if (current_len + slen < len) {
            for (size_t i = 0; i < slen; i++)
                sound[current_len + i] = s[i];
            current_len += slen;
            wrote = 1;
        }
    }

    if (!wrote) {
        snprintf(sound, len, "%d", num);
    } else if (current_len < len) {
        sound[current_len] = '\0';
    } else if (len > 0) {
        sound[len - 1] = '\0';
    }

    return sound;
}
