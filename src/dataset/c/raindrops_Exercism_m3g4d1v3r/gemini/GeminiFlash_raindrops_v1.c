#include "raindrops.h"
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void convert(char result[], int drops) {
    // Using a static const array for strings to potentially reduce cache misses and
    // improve locality of reference, although for such small strings, the impact is minimal.
    // However, it's good practice for fixed strings.
    static const char pling[] = "Pling";
    static const char plang[] = "Plang";
    static const char plong[] = "Plong";

    int len = 0; // Keep track of the current length to avoid redundant strlen calls

    // Instead of strcpy followed by strcat, directly append to the buffer.
    // This avoids an initial write and then subsequent reads for strcat.
    // It also allows for a single loop or conditional checks to build the string.

    // A more efficient way to build the string without multiple strcat calls
    // is to write directly into the buffer at the correct offset.
    // This avoids repeated traversals of the string by strcat.
    if (drops % 3 == 0) {
        memcpy(result + len, pling, strlen(pling));
        len += strlen(pling);
    }
    if (drops % 5 == 0) {
        memcpy(result + len, plang, strlen(plang));
        len += strlen(plang);
    }
    if (drops % 7 == 0) {
        memcpy(result + len, plong, strlen(plong));
        len += strlen(plong);
    }

    if (len == 0) { // If no "Pling", "Plang", or "Plong" was appended
        sprintf(result, "%d", drops);
    } else {
        result[len] = '\0'; // Null-terminate the string
    }
}