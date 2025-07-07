#include "raindrops.h"
#include <stdio.h>
#include <string.h>

// Using static inline for check_mod to encourage inlining, improving efficiency
static inline int check_mod(int a, int b) {
    return (a % b == 0);
}

void convert(char *buf, int drops) {
    // Use a fixed-size buffer for concatenation to avoid repeated string length calculations
    // and to optimize string appends.
    char temp_buf[32] = ""; // Sufficiently large for "PlingPlangPlong" or a number
    int found = 0;

    if (check_mod(drops, 3)) {
        strcat(temp_buf, "Pling");
        found = 1;
    }
    if (check_mod(drops, 5)) {
        strcat(temp_buf, "Plang");
        found = 1;
    }
    if (check_mod(drops, 7)) {
        strcat(temp_buf, "Plong");
        found = 1;
    }

    if (!found) {
        sprintf(buf, "%i", drops);
    } else {
        // Copy the content from the temporary buffer to the destination buffer once
        strcpy(buf, temp_buf);
    }
}

// The original mcat function is no longer needed as strcat is used.
// Its removal simplifies the code and relies on standard library optimizations.