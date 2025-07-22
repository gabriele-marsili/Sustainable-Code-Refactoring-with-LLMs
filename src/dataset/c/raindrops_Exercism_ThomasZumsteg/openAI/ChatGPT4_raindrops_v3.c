#include "raindrops.h"
#include <stdio.h>

char *convert(char* sound, size_t len, int num) {
    size_t pos = 0;
    if (num % 3 == 0 && pos + 5 < len) {
        for (const char *s = "Pling"; *s; ++s) sound[pos++] = *s;
    }
    if (num % 5 == 0 && pos + 5 < len) {
        for (const char *s = "Plang"; *s; ++s) sound[pos++] = *s;
    }
    if (num % 7 == 0 && pos + 5 < len) {
        for (const char *s = "Plong"; *s; ++s) sound[pos++] = *s;
    }
    if (pos == 0) {
        snprintf(sound, len, "%d", num);
    } else if (pos < len) {
        sound[pos] = '\0';
    } else if (len > 0) {
        sound[len - 1] = '\0';
    }
    return sound;
}
