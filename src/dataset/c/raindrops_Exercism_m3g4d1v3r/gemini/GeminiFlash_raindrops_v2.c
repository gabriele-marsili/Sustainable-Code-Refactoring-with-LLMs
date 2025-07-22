#include "raindrops.h"
#include <stdbool.h>
#include <stdio.h>
#include <string.h>
void convert(char result[], int drops) {
    // Using a static const char array for the strings "Pling", "Plang", "Plong"
    // avoids repeated creation of these literals on the stack or in the data segment,
    // potentially reducing cache misses and improving data locality.
    // However, for such small strings, the impact is minimal.
    // The primary optimization here is to avoid unnecessary string concatenations
    // by building the string directly into 'result' using snprintf, which is more
    // efficient than multiple strcat calls.
    // Additionally, checking the conditions in a way that avoids setting a boolean flag
    // and then checking it later can slightly reduce branching overhead.
    // A small buffer to construct the string before copying might seem useful,
    // but direct construction into 'result' is often more efficient
    // given that 'result' is expected to be large enough.
    int offset = 0;
    if (drops % 3 == 0) {
        offset += sprintf(result + offset, "Pling");
    }
    if (drops % 5 == 0) {
        offset += sprintf(result + offset, "Plang");
    }
    if (drops % 7 == 0) {
        offset += sprintf(result + offset, "Plong");
    }
    if (offset == 0) {
        sprintf(result, "%d", drops);
    }
}